#pragma once

#include "miner.h"

#include "executor.h"
#include "minethd.h"
#include "jconf.h"
#include "console.h"
#include "donate-level.h"
#include "autoAdjust.hpp"
#include "reporter.h"
#include "fs.h"

#include <cstdlib>
#include <cstdio>
#include <cstring>

#ifndef CONF_NO_TLS
#include <openssl/ssl.h>
#include <openssl/err.h>
#endif

#include "thdq.hpp"
#include "ipc_message.h"


class XMR_CPU: public Miner {
public:

  thdq<IPC_Message> *event_queue;
  XMR_CPU(thdq<IPC_Message> *event_queue) : event_queue(event_queue) {
    #ifndef CONF_NO_TLS
      SSL_library_init();
      SSL_load_error_strings();
      ERR_load_BIO_strings();
      ERR_load_crypto_strings();
      SSL_load_error_strings();
      OpenSSL_add_all_digests();
    #endif
  }

  bool start_miner() {

    string filename =  "config.txt";
    string contents = read(string(filename));

    if (!jconf::inst()->parse(contents)) {
      cout << "Failed parsing configuration file!" << endl;
      return false;
    }

    if(strlen(jconf::inst()->GetOutputFile()) != 0)
      printer::inst()->open_logfile(jconf::inst()->GetOutputFile());

    executor::inst()->ex_start(event_queue);

    return true;
  }

  Report get_report() {
    return *Report::inst();
  }

};
