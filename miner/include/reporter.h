#pragma once

#include <string>
#include <vector>
#include <array>
#include <iostream>
#include "messages.pb.h"


class Report {
public:
  size_t n_threads = 0;
  std::vector<std::array<double, 3>> hash_rates;

  std::string pool_address;
  std::string connection_est;
  std::string error_log;

  uint16_t ping = 0;
  bool connected = false;
  bool running = false;
  bool logged_in = false;

  void report() {

    for(size_t i = 0; i < n_threads; ++i) {}

    std::cout << "[] is running " << running << std::endl;
    std::cout << "connection status: " << connection_est << std::endl;
    std::cout << "ping = " << ping << std::endl;
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
