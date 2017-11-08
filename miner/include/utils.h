#pragma once

#include "messages.pb.h"
#include "reporter.h"
#include <windows.h>


#include <string>
#include <iostream>

using cauchy::Event;
using cauchy::StatusReply;
using cauchy::Statistics;
using cauchy::Hashrate;
using cauchy::SystemStatusReply;

using namespace cauchy;
using std::cout;
using std::endl;

void set_timestamp(google::protobuf::Timestamp* timestamp) {
  
  FILETIME ft;
  GetSystemTimeAsFileTime(&ft);
  UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;

  // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
  // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
  timestamp->set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
  timestamp->set_nanos((INT32) ((ticks % 10000000) * 100));
}

void set_current_timestamp(Event& event) {
  google::protobuf::Timestamp* timestamp = event.mutable_timestamp();
  set_timestamp(timestamp);
}

Event from_report(const Report& report) {

  Event event;
  StatusReply* reply = event.mutable_reply();
  reply->set_miner(cauchy::StatusReply::XMR_CPU);

  Statistics *stats = new Statistics();
  stats->set_n_threads(report.n_threads);


  for (size_t i = 0; i < report.n_threads; ++i) {
    Hashrate* hash_rate = stats->add_hashrate();
    hash_rate->set_hashrate(report.hash_rates[i][0]);
  }

  stats->set_ping(report.ping);
  stats->set_connection_est(report.connection_est);
  stats->set_error_log(report.error_log);
  stats->set_connected(report.connected);
  stats->set_pool_address(report.pool_address);

  stats->set_connected(report.connected);
  stats->set_running(report.running);
  stats->set_logged_in(report.logged_in);

  reply->set_allocated_stats(stats);

  set_current_timestamp(event);

  return event;
}

Event on_connect(const std::string& pool_address) {


  cout << "on_connect" << endl;
  Event event;
  Connection* connection = event.mutable_connection();
  connection->set_pool(pool_address);

  set_current_timestamp(event);

  return event;

}

namespace cauchy {

  Event on_miner_result(MiningResult_Result type) {


    cout << "on_miner_result" << endl;

    Event event;
    set_current_timestamp(event);

    MiningResult* result = event.mutable_result();
    result->set_result(type);
    
    
    return event;

  }
  Event on_error(const std::string& message) {

    cout << "on_error" << endl;
    Event event; 
    set_current_timestamp(event);
    
    Error* error = event.mutable_error();
    error->set_message(message);

    return event;
  }

  Event on_job(uint64_t diff) {

    cout << "on_job" << endl;
    Event event; 
    set_current_timestamp(event);
    Job* job = event.mutable_job();

    job->set_diff(diff);

    return event;

  }
}