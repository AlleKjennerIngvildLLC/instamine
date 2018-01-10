#include <fstream>
#include <iostream>
#include <memory>
#include <string>


#include <grpc++/grpc++.h>
#include <grpc++/security/server_credentials.h>
#include <grpc++/server.h>
#include <grpc++/server_builder.h>
#include <grpc++/server_context.h>

#include <boost/optional.hpp>
#include <boost/process.hpp>
#include <boost/system/system_error.hpp>

#include "helper.h"
#include "process_manager.h"


#include "messages.pb.h"
#include "miner.grpc.pb.h"
#include "miner.pb.h"


using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::ServerWriter;
using grpc::Status;

using namespace cauchy;

using std::cout;
using std::endl;

void write(const std::string &filename, const std::string &content) {
  std::ofstream out(filename);
  out << content;
  out.close();
}

class MinerStatusServiceImpl final : public MinerStatus::Service {
public:
  process_manager process;
  SharedProtobufMessageQueue<Event> *status_channel;
  bool terminate = false;

  SystemStatus_Miner active_miner_type;
  std::string exec;

  MinerStatusServiceImpl(std::string exec)
      : MinerStatus::Service(), exec(exec) {
    // this needs to be handled better!
    SharedProtobufMessageQueue<Event>::remove("test");
    status_channel = new SharedProtobufMessageQueue<Event>();
  }

  ~MinerStatusServiceImpl() {
    SharedProtobufMessageQueue<Event>::remove("test");
    delete status_channel;

    if (process.running()) {
      process.terminate();
    }
  }

  // Is the managed miner process running?
  bool miner_running() { return process.started(); }

  Status ReportStatus(ServerContext *context, const StatusRequest *request,
                      Event *event) override {

    if (process.running()) {
      if (status_channel->empty()) {
        cauchy::Event empty_event;
        auto empty = empty_event.mutable_empty();
        empty->set_status("Message queue is empty.");
        *event = empty_event;
      } else {
        *event = status_channel->pop();
      }
    } else {
      auto e = event->mutable_empty();
    }

    auto status = event->mutable_status();

    status->set_miner(active_miner_type);
    status->set_running(miner_running());

    return Status::OK;
  }

  Status SystemStatus(ServerContext *context,
                      const SystemStatusRequest *request,
                      SystemStatusReply *reply) override {

    reply->set_miner(
      static_cast<SystemStatusReply_Miner>(active_miner_type)
    );

    reply->set_running(miner_running());

    return Status::OK;
  }

  Status StartMiner(ServerContext *context, const CommandRequest *request,
                    CommandStatusReply *reply) override {

    std::string message;
    auto config = request->config().config_str();


    auto miner = request->miner();
    std::string filename;
    if (miner == CommandRequest::XMR_CPU) {
      filename = "miner_process_xmr_cpu.exe";
    }
    else if (miner == CommandRequest::XMR_CUDA) {
      filename = "miner_process_xmr_nvidia.exe";
    }
    else {
      exit(1);
    }

    active_miner_type = static_cast<SystemStatus_Miner>(miner);

    cout << "using miner exec: " << filename << endl;
  

    if (!process.started()) {

      write("config.txt", config);

      terminate = false;
      process.open_process(filename);

      message = "Server started";
    } else {
      message = "Server is running.";
    }

    cout << message << endl;
    reply->set_message(message);
    return Status::OK;
  }

  Status StopMiner(ServerContext *context, const CommandRequest *request,
                   CommandStatusReply *reply) override {

    std::string message;
    if (process.started()) {
      terminate = true;
      process.terminate();
      message = "server stopped";
    } else {
      message = "server not running";
    }

    cout << message << endl;

    reply->set_message(message);
    return Status::OK;
  }
};

void RunServer(std::string exec, std::string address = "0.0.0.0:50051") {
  std::string server_address(address);
  MinerStatusServiceImpl service(exec);

  ServerBuilder builder;

  // Do not use any authentication mechanism.
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());

  builder.RegisterService(&service);

  std::unique_ptr<Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address << std::endl;

  // Wait for the server to shutdown. Note that some other thread must be
  // responsible for shutting down the server for this call to ever return.
  server->Wait();

  std::cout << "Shutting down the server" << std::endl;
}

int main(int argc, char **argv) {

  if (argc < 2) {
    return 1;
  }

  std::string exec = argv[1];
  RunServer(exec);

  std::cout << "exiting main " << std::endl;
  return 0;
}