let latestTelemetry = null;
const fs = require("fs");

const CSV_FILE = "telemetry.csv";

if (!fs.existsSync(CSV_FILE)) {

    const header = "timestamp,speed,rpm,gear,throttle,brake,fuel,x,y,z\n";

    fs.writeFileSync(CSV_FILE, header);

}

async function fetchTelemetry(){

    try{

        const res = await fetch("http://localhost:25555/api/ats/telemetry");

        const data = await res.json();

        latestTelemetry = data;

        const row = [
            new Date().toISOString(),
            data.truck.speed,
            data.truck.engineRpm,
            data.truck.gear,
            data.truck.userThrottle,
            data.truck.userBrake,
            data.truck.fuel,
            data.truck.placement.x,
            data.truck.placement.y,
            data.truck.placement.z
        ].join(",") + "\n";

        fs.appendFileSync(CSV_FILE, row);

    }catch(err){

        console.error("Telemetry error:", err.message);

    }

}

function startTelemetry(){

    console.log("Starting telemetry polling...");

    setInterval(fetchTelemetry, 500); // 0.5 detik

}

function getTelemetry(){
    return latestTelemetry;
}

module.exports = {
    startTelemetry,
    getTelemetry
};