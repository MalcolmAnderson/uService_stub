ECHO foo on Real
curl http://localhost:4100/foo
ECHO
ECHO foo on Stub
curl https://localhost:4000/foo
ECHO
ECHO configure payload on Real to "Hi Bob"
http://localhost:4100/fooConfigure?payload=Hi%20Bob
ECHO foo on Real
curl http://localhost:4100/foo
ECHO
ECHO foo on Stub
curl https://localhost:4000/foo
