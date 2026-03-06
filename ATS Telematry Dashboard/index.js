const express = require("express");
const telemetry = require("./telemetry");

const app = express();
const PORT = 3000;

telemetry.startTelemetry();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("dashboard");
});

app.get("/telemetry", (req, res) => {

    const data = telemetry.getTelemetry();

    if(!data){
        return res.json({
            status: "waiting telemetry"
        });
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});