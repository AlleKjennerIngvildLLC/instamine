#pragma once

#include <string>
#include <vector>
#include <array>
#include <iostream>
#include "messages.pb.h"
using namespace std;


class Report {
public:
  size_t n_threads = 0;
  vector<array<double, 3>> hash_rates;

  string pool_address;
  string connection_est;
  string error_log;

  uint16_t ping = 0;
  bool connected = false;
  bool running = false;
  bool logged_in = false;

  void report() {

    for(size_t i = 0; i < n_threads; ++i) {}

    cout << "[] is running " << running << endl;
    cout << "connection status: " << connection_est << endl;
    cout << "ping = " << ping << endl;
  }

  static Report* inst() {
    if (oInst == nullptr) {
      oInst = new Report();
    }
		return oInst;
  }

private:
  static Report* oInst;
};
