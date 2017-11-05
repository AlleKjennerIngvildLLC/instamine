#pragma once

#include <boost/optional.hpp>
#include <boost/process.hpp>
#include <boost/system/system_error.hpp>
#include <iostream>

namespace bp = boost::process;

class process_manager {
public:
  bp::ipstream is;

  ~process_manager() {
    if (child)
      child->terminate();
  }

  bool started() { return child != boost::none; }

  bool running() {
    return started() && child->running(); }

  void open_process(std::string const &process) {
    child = bp::child(process);
    //child = bp::child(process, bp::std_out > is);

  }

  void terminate() {
    child->terminate();
    child = boost::none;
  }

  boost::optional<bp::child> child;
};
