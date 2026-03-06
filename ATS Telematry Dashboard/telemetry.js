let latestTelemetry = null;

async function fetchTelemetry(){

    try{

        const res = await fetch("http://localhost:25555/api/ets2/telemetry");

        const data = await res.json();

        latestTelemetry = {
            speed: data.truck.speed,
            rpm: data.truck.engineRpm,
            gear: data.truck.gear,
            throttle: data.truck.gameThrottle,
            brake: data.truck.gameBrake,
            fuel: data.truck.fuel
        };

        console.log(latestTelemetry);
        console.log("Telemetry updated");

    }catch(err){

        console.error("Fetch telemetry error:", err.message);

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