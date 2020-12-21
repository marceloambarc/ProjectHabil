const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const publicIp = require('public-ip');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get("/", async (req,res) => {
    var ipv4 = await publicIp.v4();
        //=> '46.5.21.123'
        
    var ipv6 = await publicIp.v6();
        //=> 'fe80::200:f8ff:fe21:67cf'
    
    res.render("index",{ipv4 : ipv4, ipv6: ipv6});
})

app.listen(8080,(req, res) => {
    console.log("SERVER ON!");
})