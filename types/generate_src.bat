.\protoc.exe  --proto_path=. --cpp_out=..\miner\include\types messages.proto command.proto xmr.proto
.\protoc.exe  --proto_path=. --cpp_out=..\miner\include\types miner.proto
.\protoc.exe  --plugin=protoc-gen-grpc-cpp=grpc_cpp_plugin.exe --grpc-cpp_out=..\miner\include\types miner.proto
