#pragma once

#include <string>
#include <boost/interprocess/ipc/message_queue.hpp>


#define MQ_NAME "CauchyMemoryRegion5d01-2"
#define MAX_SIZE 200
template <class MessageType>
class SharedProtobufMessageQueue
{
    
  public:
    boost::interprocess::message_queue mq;

    SharedProtobufMessageQueue()
        : mq( boost::interprocess::open_or_create, MQ_NAME, 2000, MAX_SIZE)
    {
    }

    void push(MessageType &message, unsigned int priority = 0)
    {
        auto text = serialize(message);
        mq.send(text.data(),  text.size(), priority);
    }

    MessageType pop()
    {
        size_t recvd_size;
        unsigned int priority;
        char buffer[MAX_SIZE];

        mq.receive(buffer, MAX_SIZE, recvd_size, priority);

        return deserialize(buffer, recvd_size);
    }

    size_t size() {
        return mq.get_num_msg();
    }

    std::string serialize(MessageType &message)
    {
        std::string str;
        message.SerializeToString(&str);

        return str;
    }

    MessageType deserialize(char *data, size_t size)
    {

        cauchy::Event message;

        std::string s(data);
        message.ParseFromArray(s.data(), size);

        return message;
    }
};