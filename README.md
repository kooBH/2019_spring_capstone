# 2019_spring_capstone
Sogang Univ. 2019 spring capstone class

# Warning   !!
+ 비번 같은거 코드에 박아두지말자  

# LINK
+ ThingSpeak https://thingspeak.com/channels/725653
+ Aduino Reference https://www.arduino.cc/reference/en/
+ AWS https://console.aws.amazon.com/console/home
+ [그래프](http://18.225.10.228:8080/graph)

# Note
+ 핀 넘버는 내꺼와 같은 건지 확실히 확인하자. 같은 NodeMCU라도 예제에서 쓴거랑 핀 넘버가 달라서 고생함.
+ 내껀  13 이 D7 임. 
+ 아두이노 스케치 설치 시 Jupyter notebook 경로가 날라감. jupyter 의 경로가 Aduino Sketch의 라이브러리를 가르키고 있었음.
+ 5G 와이파이는 IoT 기기가 지원을 안함. 
+ 내 IPv4 18.225.10.228  


# Log

+ Moment 설치함

```
npm install moment --save
```

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
+ 서버 timezone 변경  

https://ora-sysdba.tistory.com/entry/Cloud-Computing-Amazon-EC2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%9D%98-TIMEZONE-%EB%B3%80%EA%B2%BD  

# Setup Manual

