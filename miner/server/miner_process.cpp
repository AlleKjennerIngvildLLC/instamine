#include <iostream>
#include <memory>
#include <thread>
#include <string>
#include <condition_variable>


#include "shared.h"
#include "miners/xmr.h"

#include "reporter.h"
#include "thdq.hpp"
#include "ipc_message.h"

#define CONF_NO_TLS
using cauchy::Event;


using namespace std::chrono_literals;


int main(int argc, char** argv) {

  thdq<IPC_Message> ipc_event_queue;
	XMR miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobuf<Event> channel;

  for (int counter = 0;; ++counter) {
    auto status = ipc_event_queue.pop();

    channel.write(status);
  }
}
