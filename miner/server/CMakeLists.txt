cmake_minimum_required(VERSION 3.0)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}")

include("cmake/HunterGate.cmake")
HunterGate(
    URL "https://github.com/ruslo/hunter/archive/v0.19.74.tar.gz"
    SHA1 "a66589c041948aec2bcf374b7a45fd1e10bbc6b1"
)

project(InstamineServer)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_LIST_DIR}/cmake")

hunter_add_package(Catch)
hunter_add_package(cxxopts)
hunter_add_package(Boost COMPONENTS system filesystem)
hunter_add_package(ZLIB)
hunter_add_package(OpenSSL)

# Find dependencies
find_package(Catch CONFIG REQUIRED)
find_package(cxxopts CONFIG REQUIRED)
find_package(Boost CONFIG REQUIRED system filesystem)
find_package(ZLIB CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)

include(../common/CMakeLists.txt)

if (MSVC)
  add_definitions(-D_WIN32_WINNT=0x600 -D_SCL_SECURE_NO_WARNINGS -D_CRT_SECURE_NO_WARNINGS -D_WINSOCK_DEPRECATED_NO_WARNINGS)
  # needed to compile protobuf
  add_definitions(/wd4065 /wd4506)
  # TODO(jtattermusch): revisit C4267 occurrences throughout the code
  add_definitions(/wd4267)
  option(CMAKE_USE_WIN32_THREADS_INIT "using WIN32 threads" ON)
endif()


add_executable(instamine_server server.cpp  ${PROTO_SRCS} ${GRPC_SRCS})
target_link_libraries(
    instamine_server
    ${gRPC}
    ${PROTOBUF}
    Boost::boost
    Boost::system
    Boost::filesystem
    ZLIB::zlib
)
 
add_subdirectory(../xmr/xmr-stak-cpu ${CMAKE_CURRENT_BINARY_DIR}/xmr-stak-cpu)

add_executable(instamine_miner_process_xmr_cpu miner_process_xmr_cpu.cpp)
target_include_directories(instamine_miner_process_xmr_cpu PUBLIC "../xmr/xmr-stak-cpu")
target_link_libraries(instamine_miner_process_xmr_cpu
    Boost::boost 
    Boost::system
    Boost::filesystem 
    xmr-stak-cpu-lib    
    OpenSSL::SSL 
    OpenSSL::Crypto
)


add_subdirectory(../xmr/xmr-stak-nvidia ${CMAKE_CURRENT_BINARY_DIR}/xmr-stak-nvidia)

add_executable(instamine_miner_process_xmr_nvidia miner_process_xmr_nvidia.cpp)
target_include_directories(instamine_miner_process_xmr_nvidia PUBLIC "../xmr/xmr-stak-nvidia")
target_link_libraries(instamine_miner_process_xmr_nvidia
    Boost::boost 
    Boost::system
    Boost::filesystem 
    xmr-stak-nvidia-lib    
    OpenSSL::SSL 
    OpenSSL::Crypto
)



# add_subdirectory(../xmr/xmr-stak ${CMAKE_CURRENT_BINARY_DIR}/xmr-stak)
# add_executable(xmr xmr.cpp)
# target_include_directories(xmr PUBLIC "../xmr/xmr-stak")
# target_link_libraries(xmr
#     Boost::boost 
#     Boost::system
#     Boost::filesystem 
#     xmr-stak-lib
#     OpenSSL::SSL 
#     OpenSSL::Crypto
# )



add_executable(test1 test1.cpp ${PROTO_SRCS})
target_link_libraries(test1 
    Boost::boost 
    Boost::system
    Boost::filesystem 
    ${PROTOBUF}
)


add_executable(test2 test2.cpp ${PROTO_SRCS})
target_link_libraries(test2 
    Boost::boost 
    Boost::system
    Boost::filesystem 
    ${PROTOBUF}
)




