#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

// 🔌 WiFi credentials
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// 🌐 Backend API
String serverName = "http://192.168.1.5:3000/api/check-access"; // CHANGE IP

// 📡 RFID Pins
#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);

// ⚙️ Servo
Servo myServo;
int servoPin = 13;

void setup() {
  Serial.begin(115200);

  // WiFi connect
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected!");
  Serial.println(WiFi.localIP());

  // RFID init
  SPI.begin();
  rfid.PCD_Init();

  // Servo init
  myServo.attach(servoPin);
  myServo.write(0); // closed
}

void loop() {
  // Wait for RFID card
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  // 🧠 Read RFID UID
  String rfidUID = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    rfidUID += String(rfid.uid.uidByte[i], HEX);
  }

  rfidUID.toUpperCase();
  Serial.println("RFID: " + rfidUID);

  // 🔥 Send to backend
  sendToServer(rfidUID);

  delay(3000);
}

// 📡 API CALL FUNCTION
void sendToServer(String rfid) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    // ⚠️ Replace with YOUR MongoDB roomId
    String roomId = "PASTE_ROOM_ID_HERE";

    String jsonData = "{\"rfid\":\"" + rfid + "\",\"roomId\":\"" + roomId + "\"}";

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);

      // ✅ Check access
      if (response.indexOf("true") > 0) {
        Serial.println("ACCESS GRANTED");
        openDoor();
      } else {
        Serial.println("ACCESS DENIED");
      }

    } else {
      Serial.println("Error sending request");
    }

    http.end();
  }
}

// 🚪 SERVO FUNCTION
void openDoor() {
  myServo.write(90);  // open
  delay(3000);
  myServo.write(0);   // close
}