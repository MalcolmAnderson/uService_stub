# node_uService_stub

* Next Steps

Get HTTPS working on localhost
- https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/


Look for "Importing a Certificate into the System-Wide Certificate Authority Database"
on the following page
https://help.ubuntu.com/community/OpenSSL


Get stub (4000) to return bar (from 4100) when calling foo


Use cases
Case 1 - High == basic functionality
	real - foo returns bar
	stub - foo calls foo on real and returns bar

Case 2 - Unit test for Case 1
	real - change foo to return return foo2
	stub - No change to stub
		foo calls foo on real and returns foo2

Case 3 - Medium
	real - change port number
	stub - call configURL with localhost and new portnumber
		call stub with foo, get bar back

Case 4 - Low
	move url to config file
	calling configure on stub comments out the old url and adds the new url to the list

	
