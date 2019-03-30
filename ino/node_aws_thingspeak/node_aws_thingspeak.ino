#include "secret.h" // wifi 정보
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <DallasTemperature.h>  
#include <OneWire.h>

#define ONE_WIRE_BUS 13 // D7

#define DELAY 60000


//ThingSpeak
#define TS_msg "GET https://api.thingspeak.com/update?api_key=5EA5J3XPXFMU2N1Q&field1="
const char* TS_host = "api.thingspeak.com"; //ThinkSpeack 접근
const uint16_t TS_port = 80;  //포트

//AWS
#define AWS_msg "/log?device=705&unit=0&type=T&value="
const char* AWS_host = "18.225.10.228";
const uint16_t AWS_port = 8080;

const char* ssid     = STASSID;
const char* password = STAPSK;
IPAddress ip;

//ThingSpeak 과 aws 번갈아서
bool dest;
int seq;

ESP8266WiFiMulti WiFiMulti;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);
  sensors.begin();
  dest = 0;
  seq = 0;

  // We start by connecting to a WiFi network
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");

  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  ip = WiFi.localIP();
  Serial.println("IP address: ");
  Serial.println(ip);

  delay(500);
}

void loop() {
  WiFiClient client;  

  // 온도 받기
  sensors.requestTemperatures();
  String temper = String(sensors.getTempCByIndex(0));
  Serial.println("Temperature is : " + temper);

  if(dest){

  Serial.print("connecting to ");
  Serial.print(TS_host);
  Serial.print(':');
  Serial.println(TS_port);

  if (!client.connect(TS_host, TS_port)) {
      Serial.println("connection failed. waiting for 5 sec...");
      delay(5000);
      return;
    }
        
    String request = TS_msg;
    request += temper;
    //ThinkSpeak 서버에 전송
    client.println(request);
    //read back one line from server
    String line = client.readStringUntil('\r');
    Serial.println(line);
    Serial.println(request);

    dest=0;
  }
  else{
     if (!client.connect(AWS_host, AWS_port)) {
      Serial.println("connection failed. waiting for 5 sec...");
      delay(5000);
      return;
    }
    String request = AWS_msg;
    request +=temper;
    request +="&seq=";
    request += String(seq);
    request +="&ip=";
    request +=ip.toString();
    //client.print(request);
    client.print(String("GET ") + request + " HTTP/1.1\r\n" +
               "Host: " + AWS_host + "\r\n" + 
               "Connection: close\r\n\r\n");

    
    Serial.println(request);
    dest = 1;
  }

  seq+=1;
  Serial.println("close connection and wait 60 sec...");
  client.stop();
  delay(DELAY);
  
}
