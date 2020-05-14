start cmd.exe /c node real-ts-ms/ts-ms-real.js
rem start cmd.exe /c node stub-ts-ms-express/index.js
start cmd.exe /c start_stub.bat

echo Check real service
echo curl http://localhost:4100/foo
echo
echo Check stub returns same as real
echo curl https://localhost:4150/foo
pause
