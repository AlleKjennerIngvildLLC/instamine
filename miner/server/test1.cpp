
#include "messages.pb.h"

#include "helper.h"
#include "utils.h"
#include <boost/interprocess/ipc/message_queue.hpp>
#include <chrono>
#include <iostream>
#include <sstream>
#include <string>
#include <thread>
#include <fstream>


int main() {

  using namespace std::chrono_literals;

  try {
    SharedProtobufMessageQueue<cauchy::Event> mq;

    //cauchy::TestMessage message;
    //cauchy::TestMessage message_two;

    //message.set_debug("test_debug_message");

    //auto str = message.SerializeAsString();
    //message_two.ParseFromString(str);

    //std::cout << "debug message = " << message_two.debug() << std::endl;




    for (int i = 0; i < 20; ++i) {

      std::stringstream ss;
      ss << i;

      cauchy::Event event;

      event.mutable_status()->set_miner(cauchy::SystemStatus::XMR_CPU);
      event.mutable_status()->set_running(true);

      event.set_debug("uthethueo");

      set_current_timestamp(event);

      auto reply = event.mutable_reply();
      reply->set_miner(cauchy::StatusReply::XMR_CPU);

      cauchy::Statistics *stats = event.mutable_reply()->mutable_stats();

      stats->set_n_threads(50);
      stats->set_ping(10);
      stats->set_connection_est("iue");


      auto report = event.mutable_reply()->mutable_stats()->mutable_report();

      report->set_diff(1);
      report->set_good_results(1);
      report->set_total_results(1);
      report->set_average_result_time(4);
      report->set_ratio(1);


      std::cout << "Serialized = " << event.SerializeAsString() << std::endl;
      mq.push(event);
      auto e = mq.pop();
      std::cout << "from queue = " << e.debug() << std::endl;
      std::cout << "timestamp.seconds " << e.timestamp().seconds() << std::endl;
      std::cout << "serialized from queue " << e.SerializeAsString().size() << std::endl;

      std::cout << "_______________________________________________"
                << std::endl;


      

      std::ofstream fp("output.txt", std::ios::binary);
      fp << event.SerializeAsString();

      fp.close();

      std::ifstream fp2("output.txt", std::ios::binary);


        std::string s2((std::istreambuf_iterator<char>(fp2)),
                 std::istreambuf_iterator<char>());


      std::cout << "should be size= " << event.SerializeAsString().size() << std::endl;
      std::cout << "legit from file " << s2.size() << std::endl;



     cauchy::Event e2;
     e2.ParseFromString(s2);
     std::cout << e2.debug() << std::endl;





      std::this_thread::sleep_for(1s);
    }
  } catch (boost::interprocess::interprocess_exception &e) {
    std::cout << e.what() << std::endl;
    std::cout << e.get_error_code() << " " << e.get_native_error() << std::endl;
  }

  return 0;
}