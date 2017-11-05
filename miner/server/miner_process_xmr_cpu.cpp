#include <iostream>
#include <memory>
#include <thread>
#include <string>
#include <condition_variable>

#include "miners/xmr_cpu.h"

#include "thdq.hpp"
#include "helper.h"
#include "ipc_message.h"
#include "messages.pb.h"



int main(int argc, char** argv) {

  thdq<cauchy::Event> ipc_event_queue;
	XMR_CPU miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobufMessageQueue<cauchy::Event> channel;

  for (int counter = 0;; ++counter) {
    cauchy::Event status = ipc_event_queue.pop();

    std::cout << "got event from miner!" << std::endl;

    std::cout << "real size = " << status.ByteSizeLong() << std::endl; 
    // cauchy::Event event;
    
    std::cout << "has reply: " << status.has_reply() << std::endl;

    // auto reply = event.mutable_reply();
    // reply->set_miner(cauchy::StatusReply::XMR_CPU);
    
    // cauchy::Statistics *stats = new cauchy::Statistics();
    // stats->set_n_threads(50);

    // stats->set_ping(10);
    // stats->set_connection_est("iue");


    channel.push(status);
  }
}
