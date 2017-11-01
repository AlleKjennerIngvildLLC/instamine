#include <fstream>
#include <streambuf>
#include <string>

#include "fs.h"

using namespace std;

string read(const string& filename) {
  ifstream t(filename);
  string str((istreambuf_iterator<char>(t)), istreambuf_iterator<char>());

  return str;
}

void write(const string& filename, const string& content) {
  ofstream out(filename);
  out << content;
  out.close();
}