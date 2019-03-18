# 2019_spring_capstone
Sogang Univ. 2019 spring capstone class

# LINK
+ ThingSpeak https://thingspeak.com/channels/725653
+ Aduino Reference https://www.arduino.cc/reference/en/
+ AWS https://aws.amazon.com/ko/

# Note
+ 핀 넘버는 내꺼와 같은 건지 확실히 확인하자. 같은 NodeMCU라도 예제에서 쓴거랑 핀 넘버가 달라서 고생함.
+ 내껀  13 이 D7 임. 
+ 아두이노 스케치 설치 시 Jupyter notebook 경로가 날라감. jupyter 의 경로가 Aduino Sketch의 라이브러리를 가르키고 있었음.
+ 5G 와이파이는 IoT 기기가 지원을 안함. 
+ 내 IPv4 18.225.10.228  


# Log
+ 그냥 패키지매니저로 nodejs랑 npm설치함.
```
sudo apt-get install nodejs npm
```

+ tcp 테스트  
서버  
```
nc -l -p <port>
```
클라이언트  
```
telnet <host> <port>
```


# Setup Manual

