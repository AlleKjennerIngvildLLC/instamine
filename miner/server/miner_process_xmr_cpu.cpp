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
      cauchy::Event status = ipc_event_queue.pop();
      channel.push(status);
  }
}
