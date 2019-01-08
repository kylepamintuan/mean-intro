const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next();
});

app.options('*', (req, res) => {
    res.set({
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Access-Control-Request-Headers, Content-Type'
    })
    return res.send('okay');
});

app.post("/api/registration", (req, res) => {
    console.log(req.body);
    
    let output = {
        success: true,
        requestData: req.body
    };

    return res.json(output);
});

app.post("/api/login", (req, res) => {
    res.send('login');
});

app.get("/api/user-profile", (req, res) => {
    res.send('user profile');
});

app.get('/', function(req, res) {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})