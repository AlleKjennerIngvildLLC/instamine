
#include "helper.h"
#include "messages.pb.h"

#include <iostream>

using namespace cauchy;

int main()
{

    SharedProtobufMessageQueue<cauchy::Event> mq;

    std::cout << "number of messages: " << mq.size() << std::endl;

    size_t num_msg = mq.size();
    for (size_t i = 0; i < num_msg; ++i)
    {
        cauchy::Event event = mq.pop();


        //if (event.has_reply()) {

            std::cout << "timestamp.seconds() = " << event.timestamp().seconds() << std::endl;
            std::cout << event.has_reply() << std::endl;
            std::cout << "reply message with" << std::endl;
            std::cout << event.timestamp().seconds() << std::endl;
            std::cout << "message = " << event.debug() << std::endl;

        //}
    }

    return 0;
}