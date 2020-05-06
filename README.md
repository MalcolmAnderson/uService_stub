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
		
Case 2.1 - Unit test for Case 2.1  
- Likely design - method for loadConfiguration and some kind of timer service to check the configuration timestamp  
- all tests use fake as a test bench, no changes are made to fake during testing  
- real - return "code" comes from a configuration file with default value of "default"  
- Test 1 - check code without configuration - it returns "default"  
- Test 2 - check code with configuration - it returns "from config file"  
- Test 3 - change and save config file with "bar" - system returns bar without being reset  

Case 2.2 - Unit test for Case 2.2  
	start up 2 copies of real one on 4100 and one on 4200, both return their port number  
	startup fake defaulting to 4100  
	send a change configuration message to fake to point to 4200  
	Test 1 - fake starts pointing to the service on 4200  
	Test 2 - fake audit history contains changes to configuration.  
	test 3 - send a "ResetToDefault" message, and fake reconfigures itself from config file  
-test 4 - send message to point to 4200, see change  
--restart service - see that it points to 4100  
--send message to point to 4200, see change  
		send "SaveConfiguration" message  
		restart service - see that it points to 4200  
		send ResetToDefault (read configuration file) - see that it points to 4200  
		send ResetToFactory (read factory config file) - see that it points to 4100  

Case 2.3 - add 6 "method loops" that log messages at specific frequencies  
	TRACE - Every second - "T-0000x"  
	DEBUG - Every other second - "D-0000x"  
	INFO - Every 5 seconds - "I-0000x"  
	WARN - Every 10 seconds - "W-0000x"  
	ERROR - Every 15 seconds - "E-0000x"  
	FATAL - Every 30 seconds - "F-0000x"  
	Test 1 - Change and save the the config file where level is set - see the logging change to reflect the level  
	Test 2 - Send a ChangeLoggingLevel message to change the config - see the logging level change  
	Resources  
		https://stackify.com/13-ways-to-tail-a-log-file-on-windows-unix/  
		Powershell - Get-Content myTestLog.log -wait | where { $_ -match “WARNING” } (slow for large files)  
		Notepad++ use Document Monitor Plugin  
		LogExpert  

Case 2.4 - Automated Unit testing  
	create go.bat and go.sh that, in a cloned directory:  
		configure unique services for each test  
		run each test (in parallel)  
		return useful diagnostics on each failure found  
	Final test part 1 - check in a non breaking change - see green in Jenkins  
	Final test part 2 - check in a breaking change - see red in Jenkins  

Case 3 - Medium
	real - change port number
	stub - call configURL with localhost and new portnumber
		call stub with foo, get bar back

Case 4 - Low
	move url to config file
	calling configure on stub comments out the old url and adds the new url to the list

	
