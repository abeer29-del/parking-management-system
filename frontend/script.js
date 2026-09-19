const parkingForm = document.getElementById("parkingForm");

parkingForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const vehicleNumber =
        document.getElementById("vehicleNumber").value;

    const vehicleType =
        document.getElementById("vehicleType").value;

    const hours =
        document.getElementById("hours").value;


    const vehicleData = {
        number: vehicleNumber,
        type: vehicleType,
        hours: parseInt(hours)
    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/park",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(vehicleData)
            }
        );


        const data = await response.json();

        console.log(data);


        document.getElementById("result").innerText =
            data.Message;


        if (data.Message === "Your vehicle has been parked successfully") {

            parkingForm.reset();

        }


    } catch (error) {

        console.error(error);

        document.getElementById("result").innerText =
            "Unable to connect to the backend.";

    }

});


// ========================================
// CHECK VEHICLE FEE
// ========================================

const checkFeeBtn =
    document.getElementById("checkFeeBtn");


checkFeeBtn.addEventListener("click", async function() {

    const vehicleNumber =
        document.getElementById("getVehicleNumber").value.trim();


    const feeResult =
        document.getElementById("feeResult");

    const paymentSection =
        document.getElementById("paymentSection");


    const getVehicleResult =
        document.getElementById("getVehicleResult");


    if (vehicleNumber === "") {

        feeResult.className = "error-message";

        feeResult.innerText =
            "Please enter a vehicle number.";

        paymentSection.classList.remove("show");

        return;

    }


    try {

        const response = await fetch(
            `http://127.0.0.1:8000/vehicle/${encodeURIComponent(vehicleNumber)}`
        );


        const data = await response.json();

        console.log(data);


        if (data["Parking Fee"] !== undefined) {

            feeResult.className = "fee-result show";

            feeResult.innerHTML = `
                <div class="fee-title">
                    Vehicle Found!
                </div>

                <p>
                    Vehicle Number:
                    <strong>${data["Vehicle Number"]}</strong>
                </p>

                <p>
                    Vehicle Type:
                    <strong>${data["Vehicle Type"]}</strong>
                </p>

                <p>
                    Parking Hours:
                    <strong>${data["Parking Hours"]}</strong>
                </p>

                <p>
                    Parking Fee:
                </p>

                <div class="fee-amount">
                    Rs. ${data["Parking Fee"]}
                </div>
            `;


            // Show payment section
            paymentSection.classList.add("show");


            // Clear old result
            getVehicleResult.innerHTML = "";


        } else {

            feeResult.className = "error-message";

            feeResult.innerText =
                data.Message;

            paymentSection.classList.remove("show");

        }


    } catch (error) {

        console.error(error);

        feeResult.className = "error-message";

        feeResult.innerText =
            "Unable to connect to the backend.";

        paymentSection.classList.remove("show");

    }

});


// ========================================
// GET VEHICLE / PAYMENT
// ========================================

const getVehicleBtn =
    document.getElementById("getVehicleBtn");


getVehicleBtn.addEventListener("click", async function() {

    const vehicleNumber =
        document.getElementById("getVehicleNumber").value.trim();


    const payment =
        document.getElementById("payment").value;


    const getVehicleResult =
        document.getElementById("getVehicleResult");


    if (vehicleNumber === "") {

        getVehicleResult.className = "error-message";

        getVehicleResult.innerText =
            "Please enter a vehicle number.";

        return;

    }


    if (payment === "") {

        getVehicleResult.className = "error-message";

        getVehicleResult.innerText =
            "Please enter the payment amount.";

        return;

    }


    const vehicleData = {

        number: vehicleNumber,

        payment: parseInt(payment)

    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/get-vehicle",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(vehicleData)
            }
        );


        const data = await response.json();

        console.log(data);


        if (data.Message === "Payment Successful!") {

            getVehicleResult.className =
                "success-message";


            getVehicleResult.innerHTML = `

                <strong>Payment Successful!</strong>

                <p>
                    Vehicle Number:
                    ${data["Vehicle Number"]}
                </p>

                <p>
                    Vehicle Type:
                    ${data["Vehicle Type"]}
                </p>

                <p>
                    Parking Fee:
                    Rs. ${data["Parking Fee"]}
                </p>

                <p>
                    Paid Amount:
                    Rs. ${data["Paid Amount"]}
                </p>

                <div class="cashback">
                    Cashback:
                    Rs. ${data["Cashback"]}
                </div>

            `;


            // Clear payment fields
            document.getElementById(
                "getVehicleNumber"
            ).value = "";

            document.getElementById(
                "payment"
            ).value = "";


            // Hide fee and payment sections
            document.getElementById(
                "feeResult"
            ).className = "fee-result";


            document.getElementById(
                "paymentSection"
            ).classList.remove("show");


        } else {

            getVehicleResult.className =
                "error-message";


            if (data.Required !== undefined) {

                getVehicleResult.innerHTML = `

                    <strong>Insufficient Payment!</strong>

                    <p>
                        Required:
                        Rs. ${data.Required}
                    </p>

                    <p>
                        Paid:
                        Rs. ${data.Paid}
                    </p>

                    <p>
                        Please enter the correct payment amount.
                    </p>

                `;

            } else {

                getVehicleResult.innerText =
                    data.Message;

            }

        }


    } catch (error) {

        console.error(error);

        getVehicleResult.className =
            "error-message";

        getVehicleResult.innerText =
            "Unable to connect to the backend.";

    }

});


// ========================================
// VIEW PARKED VEHICLES
// ========================================

const viewVehiclesBtn =
    document.getElementById("viewVehiclesBtn");


viewVehiclesBtn.addEventListener("click", async function() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/vehicles"
        );


        const data = await response.json();

        console.log(data);


        const vehiclesResult =
            document.getElementById("vehiclesResult");


        if (data.vehicles) {

            vehiclesResult.innerHTML = "";


            data.vehicles.forEach(function(vehicle) {

                vehiclesResult.innerHTML += `

                    <div class="vehicle-card">

                        <p>
                            <strong>Vehicle Number:</strong>
                            ${vehicle.number}
                        </p>

                        <p>
                            <strong>Vehicle Type:</strong>
                            ${vehicle.type}
                        </p>

                        <p>
                            <strong>Parking Hours:</strong>
                            ${vehicle.hours}
                        </p>

                        <p>
                            <strong>Parking Fee:</strong>
                            Rs. ${vehicle.fee}
                        </p>

                    </div>

                `;

            });


        } else {

            vehiclesResult.innerText =
                data.Message;

        }


    } catch (error) {

        console.error(error);

        document.getElementById(
            "vehiclesResult"
        ).innerText =
            "Unable to connect to the backend.";

    }

});
