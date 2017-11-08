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
    channel.push(status);
  }
}
