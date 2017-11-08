#include "miners/xmr_nvidia.h"

#include "thdq.hpp"
#include "helper.h"
#include "ipc_message.h"

using cauchy::Event;

int main(int argc, char** argv) {

  thdq<IPC_Message> ipc_event_queue;
	XMR_NVIDIA miner(&ipc_event_queue);

  miner.start_miner();

  SharedProtobufMessageQueue<IPC_Message> channel;
  
  for (int counter = 0;; ++counter) {
    IPC_Message status = ipc_event_queue.pop();

    channel.push(status);
    
  }
}
