
set(PROJECT_BASE
    /users/kyrre/desktop/cauchylabs/instamine/miner
)

set(TYPES_INCLUDE_DIRECTORY ${PROJECT_BASE}/include/types)
include_directories(SYSTEM  ${PROJECT_BASE}/include/ ${TYPES_INCLUDE_DIRECTORY})

set(gRPC
    ${PROJECT_BASE}/deps/grpc/lib/gpr.lib
    ${PROJECT_BASE}/deps/grpc/lib/grpc_unsecure.lib
    ${PROJECT_BASE}/deps/grpc/lib/grpc++_unsecure.lib
)

set(PROTOBUF 
    ${PROJECT_BASE}/deps/protobuf/lib/libprotobuf.lib
    ${PROJECT_BASE}/deps/protobuf/lib/libprotobuf-lite.lib 
    ${PROJECT_BASE}/deps/protobuf/lib/libprotoc.lib
)

set(PROTO_SRCS
    ${TYPES_INCLUDE_DIRECTORY}/messages.pb.cc 
    ${TYPES_INCLUDE_DIRECTORY}/miner.pb.cc 
    ${TYPES_INCLUDE_DIRECTORY}/xmr.pb.cc 
    ${TYPES_INCLUDE_DIRECTORY}/command.pb.cc
)

set(GRPC_SRCS
    ${TYPES_INCLUDE_DIRECTORY}/miner.grpc.pb.cc
)
