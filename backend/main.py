from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Parking list
parking = []


# Model for parking a vehicle
class Vehicle(BaseModel):
    number: str
    type: str
    hours: int


# Model for getting a vehicle
class GetVehicle(BaseModel):
    number: str
    payment: int


# Home route
@app.get("/")
def home():
    return {
        "Message": "Parking Management System API is running!"
    }
    


# Park Vehicle
@app.post("/park")
def park_vehicle(vehicle: Vehicle):

    if vehicle.type == "Car":
        fee_per_hour = 100

    elif vehicle.type == "Bike":
        fee_per_hour = 50

    else:
        return {
            "Message": "Invalid Vehicle Type!"
        }

    # Check if vehicle is already parked
    for parked_vehicle in parking:

        if parked_vehicle["number"] == vehicle.number:
            return {
                "Message": "Vehicle Already Parked!"
            }

    # Calculate total fee
    total_fee = vehicle.hours * fee_per_hour

    # Create vehicle dictionary
    new_vehicle = {
        "number": vehicle.number,
        "type": vehicle.type,
        "hours": vehicle.hours,
        "fee": total_fee
    }

    # Add vehicle to parking
    parking.append(new_vehicle)

    return {
        "Message": "Your vehicle has been parked successfully",
        "vehicle": new_vehicle
    }


# Check Vehicle Fee
@app.get("/vehicle/{number}")
def check_vehicle_fee(number: str):

    # Search for vehicle
    for vehicle in parking:

        if vehicle["number"] == number:

            return {
                "Message": "Vehicle Found!",
                "Vehicle Number": vehicle["number"],
                "Vehicle Type": vehicle["type"],
                "Parking Hours": vehicle["hours"],
                "Parking Fee": vehicle["fee"]
            }

    # Vehicle was not found
    return {
        "Message": "Vehicle not found!"
    }


# Get Vehicle
@app.post("/get-vehicle")
def get_vehicle(data: GetVehicle):

    # Search for vehicle
    for vehicle in parking:

        if vehicle["number"] == data.number:

            # Get parking fee
            fee = vehicle["fee"]

            # Check payment
            if data.payment < fee:
                return {
                    "Message": "Insufficient payment!",
                    "Required": fee,
                    "Paid": data.payment
                }

            # Calculate cashback
            cashback = data.payment - fee

            # Remove vehicle from parking
            parking.remove(vehicle)

            return {
                "Message": "Payment Successful!",
                "Vehicle Number": vehicle["number"],
                "Vehicle Type": vehicle["type"],
                "Parking Hours": vehicle["hours"],
                "Parking Fee": fee,
                "Paid Amount": data.payment,
                "Cashback": cashback
            }

    # Vehicle was not found
    return {
        "Message": "Vehicle not found!"
    }


# View Parked Vehicles
@app.get("/vehicles")
def view_vehicles():

    if len(parking) == 0:
        return {
            "Message": "No vehicles are currently parked."
        }

    return {
        "Message": "Parked Vehicles",
        "vehicles": parking
    }