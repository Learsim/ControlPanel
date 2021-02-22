{VERSIONINFO}

{LIBRARIES}
{DEFINES}
void setup() {
  Serial.begin({BAUDRATE});
  Serial.println("Initlizing Learsim..");
  Serial.println({SERIALBEGIN});
  {SETUP}
}

void loop() {
{MAINLOOP}
}
{FUNCTIONS}

{CLASSES}