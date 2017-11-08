#include <fstream>
#include <streambuf>
#include <string>


std::string read(const std::string& filename) {
  std::ifstream t(filename);
  std::string str((std::istreambuf_iterator<char>(t)), std::istreambuf_iterator<char>());

  return str;
}

void write(const std::string& filename, const std::string& content) {
  std::ofstream out(filename);
  out << content;
  out.close();
}