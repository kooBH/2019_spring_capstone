#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <DallasTemperature.h>
#include <OneWire.h>

#define ONE_WIRE_BUS 13 // D7

#ifndef STASSID  
#define STASSID "와이파이 이름"  //접속할 와이파이
#define STAPSK  "와이파이 비번"  //비번
#endif

//API 키와 보낼 메세지
#define MSG2SEND "GET https://api.thingspeak.com/update?api_key=나의 API 키="
const char* host = "api.thingspeak.com"; //ThinkSpeack 접근
const uint16_t port = 80;  //포트


const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WiFiMulti WiFiMulti;

OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);
  sensors.begin();

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
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(500);
}


void loop() {
  
  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);

  // Use WiFiClient class to create TCP connections
  WiFiClient client;

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    Serial.println("wait 5 sec...");
    delay(5000);
    return;
  }

  //String line = client.readStringUntil('\r');
  // 온도 받기
  sensors.requestTemperatures();
  String temper = String(sensors.getTempCByIndex(0));
  Serial.println("Temperature is : " + temper);
  
  String request = MSG2SEND;
  request += temper;
  //ThinkSpeak 서버에 전송
  client.println(request);
  
   //read back one line from server
  String line = client.readStringUntil('\r');
  Serial.println(line);
  
  Serial.println("closing connection");
  client.stop();

  //1분마다 
  Serial.println("wait 60 sec...");
  delay(60000);
  
}
