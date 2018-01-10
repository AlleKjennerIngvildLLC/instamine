#include <condition_variable>
#include <exception>
#include <iostream>
#include <memory>
#include <string>
#include <thread>

#include "miners/xmr_cpu.h"

#include "helper.h"
#include "ipc_message.h"
#include "messages.pb.h"
#include "thdq.hpp"

void set_current_timestamp(cauchy::Event& event);

int main(int argc, char **argv) {

  thdq<cauchy::Event> ipc_event_queue;
  XMR_CPU miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobufMessageQueue<cauchy::Event> channel;

  for (int counter = 0;; ++counter) {
    try {
      cauchy::Event status = ipc_event_queue.pop();

      std::cout << "reply = " << status.has_reply() << std::endl;
      std::cout << "error = " << status.has_error() << std::endl;


      if (status.has_error()) {


        std::cout << "ERROR MESSAGE " << status.mutable_error()->message() << std::endl;

      }

      channel.push(status);
    } catch (std::exception &e) {

      std::cout << "handling error " 
               << e.what() 
               << std::endl;



      cauchy::Event status;
      set_current_timestamp(status);
      auto error = status.mutable_error();
      error->set_message("Connection error.");
      channel.push(status);

      break;
    }
  }
}
