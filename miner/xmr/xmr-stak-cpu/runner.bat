set XMR_PREFIX=c:\Users\k\Desktop\projects\xmr
set CMAKE_PREFIX_PATH=%XMR_PREFIX%\xmr-stak-dep\hwloc;%XMR_PREFIX%\xmr-stak-dep\libmicrohttpd;%XMR_PREFIX%\openssl
:: mkdir _build
:: cd _build
:: cmake -G "Visual Studio 14 2015 Win64" -T host=x64 ..
:: #msbuild xmr-stak-cpu.sln /p:Configuration=Release

cmake -H. -B_builds -DHUNTER_STATUS_DEBUG=ON -G"Visual Studio 14 2015 Win64" -T host=x64 -DCMAKE_BUILD_TYPE=Release 
