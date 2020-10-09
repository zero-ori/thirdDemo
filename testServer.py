# -*- coding: UTF-8 -*-
import sys
from socket import *
serverSocket = socket(AF_INET, SOCK_STREAM) 
#Prepare a sever socket 
serverSocket.bind(('',12345))
serverSocket.listen(15)
#Fill in start 
#Fill in end 
execute = 1
while execute:
	print 'Ready to serve...'     
	connectionSocket,A= serverSocket.accept()  #Fill in start  #Fill in end
	once = 1
	times = 2
	print A
	while times > 0: 
		times = times - 1     
	#Establish the connection   
		try:         
			# message = connectionSocket.recv(2048)  #Fill in start  #Fill in end
			# filename = message.split(' ')[1] 
			# print(filename)
			# f = open(filename[1:])

# 			httpdata="""{
# "status":\"success\", 
# "code": 200, 
# "data": {
# 	"errorCode": 401, 
# 	"errorMessage":"需要端口服务请联系我～qq:2625521912"
# }"""+'}'
			httpdata="""{"aa":"1"}"""


			a = len(httpdata)
			# print httpdata
			httphead="""
HTTP/1.1 200 OK
Date: Sat, 31 Dec 2005 23:59:59 GMT
Content-Type: text/html;charset=UTF-8
Content-Length:"""+str(a)+'\n'+'\n'
			# outputdata = httphead+f.read() #Fill in start  #Fill in end
			if once:
				# x = connectionSocket.recv(1024)
				# print(x)
				outputdata = httphead + httpdata
				once=0
				connectionSocket.send(outputdata)
			else:
				outputdata = httpdata
				connectionSocket.send(outputdata)
				connectionSocket.close()
			#Send one HTTP header line into socket         
		

			#Send the content of the requested file to the client
			
			# for i in range(0, len(outputdata)):
			# 	connectionSocket.send(outputdata[i].encode)
			# connectionSocket.close()
		except IOError:
			connectionSocket.close()            
serverSocket.close()