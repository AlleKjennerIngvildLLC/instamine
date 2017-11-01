set PROTOC=.\node_modules\.bin\grpc_tools_node_protoc.cmd
SET PROTOS_PATH=..\types
SET PROJECT=Client
set PLUGIN=protoc-gen-grpc=.\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd

set GRPC_OUT=app\rpc
set JS_OUT=app\rpc

mkdir %JS_OUT%
mkdir %GRPC_OUT%

CALL %PROTOC% -I%PROTOS_PATH% --js_out=import_style=commonjs,binary:%GRPC_OUT% --grpc_out=%GRPC_OUT% --plugin=%PLUGIN% %PROTOS_PATH%\miner.proto
CALL %PROTOC% -I%PROTOS_PATH% --js_out=import_style=commonjs,binary:%JS_OUT% %PROTOS_PATH%\xmr.proto %PROTOS_PATH%\command.proto  %PROTOS_PATH%\messages.proto
