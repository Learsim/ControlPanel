import flask
import uuid
from flask import request
import json
app = flask.Flask(__name__)
app.config["DEBUG"] = True
clients = [
    {
      "ConnectionType": 0,
      "guid": "5785f0e5-9162-4b90-966b-30bef0019639",
      "Name": "Arduino1",
      "Adress": "COM15",
      "StaticPort": False,
      "Baud": 9600,
      "Port": None,
      "bindings": [
        {
          "Identfier": "AMBIENT_TEMPERATURE",
          "ValueName": "valuename",
          "Type": 2,
          "Index": 0,
          "Input": False
        }
      ],
      "connectionState": 0,
      "Inputs": [
        {
          "Key": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Identfier": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Type": 0
        }
      ],
      "ConnectionStateString": "Disconnected",
      "ConnectionTypeString": "SERIAL"
    },
    {
      "ConnectionType": 0,
      "guid": "5785f0a5-9162-4b90-966b-30bef0019639",
      "Name": "Arduino2",
      "Adress": "COM11",
      "StaticPort": False,
      "Baud": 9600,
      "Port": None,
      "bindings": [
        {
          "Identfier": "GENERAL_ENG_THROTTLE_LEVER_POSITION",
          "ValueName": "valuename",
          "Type": 2,
          "Index": 1,
          "Input": False
        }
      ],
      "connectionState": 0,
      "Inputs": [
        {
          "Key": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Identfier": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Type": 0
        }
      ],
      "ConnectionStateString": "Disconnected",
      "ConnectionTypeString": "SERIAL"
    },
    {
      "ConnectionType": 0,
      "guid": "5785f0b5-9162-4b90-966b-30bef0019639",
      "Name": "Arduino3",
      "Adress": "COM3",
      "StaticPort": True,
      "Baud": 9600,
      "Port": None,
      "bindings": [
        {
          "Identfier": "GROUND_ALTITUDE",
          "ValueName": "valuename",
          "Type": 2,
          "Index": 0,
          "Input": False
        }
      ],
      "connectionState": 0,
      "Inputs": [
        {
          "Key": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Identfier": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Type": 0
        }
      ],
      "ConnectionStateString": "Disconnected",
      "ConnectionTypeString": "SERIAL"
    }
  ]
isConnected = False
@app.route('/api/clients', methods=['GET','POST','PATCH','DELETE'])
def getClients():
    if(request.method == "GET"):
        return json.dumps(clients)
    elif(request.method == "POST"):
        clients.append({
      "ConnectionType": request.headers["connectiontype"],
      "guid": str(uuid.uuid4()),
      "Name": request.headers["name"],
      "Adress":  request.headers["adress"],
      "StaticPort":  bool(request.headers["staticport"]),
      "Baud":  int(request.headers["baud"]),
      "Port":  None,
      "bindings": [
        {
          "Identfier": "GROUND_ALTITUDE",
          "ValueName": "valuename",
          "Type": 2,
          "Index": 0,
          "Input": False
        }
      ],
      "connectionState": 0,
      "Inputs": [
        {
          "Key": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Identfier": "TAKEOFF_ASSIST_ARM_TOGGLE",
          "Type": 0
        }
      ],
      "ConnectionStateString": "Connected",
      "ConnectionTypeString": "SERIAL"
    })
        return json.dumps(clients)
    elif(request.method == "PATCH"):
        print("NOTIMPLEMETED")
    elif(request.method == "DELETE"):
        print("NOTIMPLEMETED")
    return str(False)
@app.route('/api/config', methods=['GET','PATCH'])
def getConfig():
    return "nan"
@app.route('/api/getEnums', methods=['GET'])
def getEnums():
    return "nan"
@app.route('/api/simconnect/connect', methods=['POST'])
def simConnect():
    global isConnected
    isConnected = True
    return  str(isConnected).lower()
@app.route('/api/simconnect/disconnect', methods=['POST'])
def simDisconnect():
    global isConnected
    isConnected = True
    return  str(isConnected).lower()
    
@app.route('/api/status', methods=['GET'])
def getStatus():
    global isConnected
    print('{"SimConnection":'+str(isConnected).lower()+'}')
    return '{"SimConnection":'+str(isConnected).lower()+'}'
app.run(port=8888)