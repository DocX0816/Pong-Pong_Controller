void setup() {
 Serial.begin(9600); // initialize serial communications
}
 
void loop() {
 int potentiometer1 = analogRead(A0); // read the input pin
 int potentiometer2 = analogRead(A1);
 int mappedPot1 = map(potentiometer1, 0, 1023, 0, 255); // remap the pot value to fit in 1 byte
 int mappedPot2 = map(potentiometer2,0,1023,0,255);
 int mappedPot11 = map(mappedPot1, 0, 171, 0, 255); 
 int mappedPot22 = map(mappedPot2, 0, 171, 0, 255); 
 String map1 = padding(String(mappedPot11));
 String map2 = padding(String(mappedPot22));
 // int finalMap = map1.toInt() + " " + map2.toInt();
 Serial.write(map1.toInt());
 delay(10);
 Serial.write(map2.toInt());
 delay(10);                            // print it out the serial port                                            // slight delay to stabilize the ADC
}

String padding(String n){
  if(n.length() == 1){
    return "00" + n;
  }else if(n.length() == 2){
    return "0" + n;
  }else if(n.length() == 3){
    return "" + n;
  }
  
}


