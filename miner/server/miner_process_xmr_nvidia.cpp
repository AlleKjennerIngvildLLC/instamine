#include "miners/xmr_nvidia.h"

#include "thdq.hpp"
#include "shared.h"
#include "ipc_message.h"

using cauchy::Event;

int main(int argc, char** argv) {

  thdq<IPC_Message> ipc_event_queue;
	XMR_NVIDIA miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobuf<Event> channel;

  for (int counter = 0;; ++counter) {
    auto status = ipc_event_queue.pop();

    channel.write(status);
  }
}
