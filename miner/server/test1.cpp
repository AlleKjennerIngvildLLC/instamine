
#include "messages.pb.h"

#include <iostream>
#include <string>
#include <sstream>
#include <thread>
#include <chrono>
#include <boost/interprocess/ipc/message_queue.hpp>
#include "helper.h"

int main()
{

   
 
    using namespace std::chrono_literals;
    

    try {
        SharedProtobufMessageQueue<cauchy::Event> mq;

        for (int i = 0; i < 20; ++i)
        {

            std::stringstream ss;
            ss << i;

            cauchy::Event event;
            // auto error = event.mutable_error();
            // error->set_message("hello: " + ss.str());

            auto reply = event.mutable_reply();
            reply->set_miner(cauchy::StatusReply::XMR_CPU);
            
            cauchy::Statistics *stats = new cauchy::Statistics();
            stats->set_n_threads(50);

            stats->set_ping(10);
            stats->set_connection_est("iue");

            mq.push(event);

            std::this_thread::sleep_for(1s);
            
        }
    } 
    catch (boost::interprocess::interprocess_exception& e) {
        std::cout << e.what( ) << std::endl;
            std::cout << e.get_error_code() << " " << e.get_native_error() << std::endl;
    }
    
    return 0;
}