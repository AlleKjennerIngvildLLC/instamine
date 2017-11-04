#include <iostream>
#include <memory>
#include <thread>
#include <string>
#include <condition_variable>

#include "miners/xmr_cpu.h"

#include "thdq.hpp"
#include "shared.h"
#include "ipc_message.h"

using cauchy::Event;

int main(int argc, char** argv) {

  thdq<IPC_Message> ipc_event_queue;
	XMR_CPU miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobuf<Event> channel;

  for (int counter = 0;; ++counter) {
    auto status = ipc_event_queue.pop();

    channel.write(status);
  }
}
