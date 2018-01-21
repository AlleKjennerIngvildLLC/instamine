#pragma once

#include <boost/interprocess/allocators/allocator.hpp>
#include <boost/interprocess/containers/string.hpp>
#include <boost/interprocess/managed_shared_memory.hpp>
#include <boost/interprocess/sync/interprocess_condition.hpp>
#include <boost/interprocess/sync/interprocess_mutex.hpp>
#include <boost/interprocess/sync/scoped_lock.hpp>
#include <boost/thread/thread_time.hpp>

#include <iostream>

namespace bi = boost::interprocess;
using std::cout;
using std::endl;

typedef bi::managed_shared_memory::segment_manager segment_manager_t;
typedef bi::allocator<void, segment_manager_t> void_allocator;
typedef bi::allocator<char, segment_manager_t> char_allocator;
typedef bi::basic_string<char, std::char_traits<char>, char_allocator>
    char_string;

#define SHM_REGION_NAME "__CauchyMemoryRegion__"
#define LOCK_TIMEOUT_DURATION 8000


void force_remove() {
  bi::shared_memory_object::remove(SHM_REGION_NAME);
}

template <class MessageType> class SharedProtobuf {
public:
  bi::managed_shared_memory segment;
  void_allocator alloc_inst;
  bi::interprocess_mutex *mtx;
  bi::interprocess_condition *cnd;
  bi::scoped_lock<bi::interprocess_mutex> lock;

  char_string *data;

  std::string serialize(MessageType &message) {
    std::string str;
    message.SerializeToString(&str);

    return str;
  }

  SharedProtobuf()
      : segment(bi::open_or_create, SHM_REGION_NAME, 65536),
        alloc_inst(segment.get_segment_manager()) {

    mtx = segment.find_or_construct<bi::interprocess_mutex>("mtx")();
    data = segment.find_or_construct<char_string>("PB")(alloc_inst);
    cnd = segment.find_or_construct<bi::interprocess_condition>("cnd")();
    lock = bi::scoped_lock<bi::interprocess_mutex>(*mtx);

    cnd->notify_one();
  }

  ~SharedProtobuf() { bi::shared_memory_object::remove(SHM_REGION_NAME); }

  void write(MessageType &message, std::string debug="") {
    ///cout << "writing for [" << debug << "]" << endl;
    boost::system_time timeout =
        boost::get_system_time() + boost::posix_time::milliseconds(LOCK_TIMEOUT_DURATION);
    if (!cnd->timed_wait(lock, timeout)) {
      cout << "write timeout! [" << debug << "]" << endl;
      // cnd->notify_one();
    }
    else {
      //cout << "really writing data [" << debug << "]" << endl;

      *data = serialize(message).c_str();
      cnd->notify_one();
      

      //cout << "wrote data [" << debug << "]" << endl;
    }

    
  }

  MessageType read() {

    MessageType message = MessageType();

    boost::system_time timeout =
        boost::get_system_time() + boost::posix_time::milliseconds(LOCK_TIMEOUT_DURATION);

    if (!cnd->timed_wait(lock, timeout)) {
      cout << "read timeout!" << endl;
    } else {

      std::string s(data->begin(), data->end());
      message.ParseFromArray(s.data(), s.size());

      cnd->notify_one();      
    }
    

    return message;
  }

};
