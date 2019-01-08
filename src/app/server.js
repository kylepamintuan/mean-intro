const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//TODO: allow options request to get a response

app.options('*', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    return res.send('okay');
});

app.post("/api/registration", (req, res) => {
    let output = {
        success: true,
        requestData: req.body
    };

    if(err) {
        output.success =  false;
    }

    res.send(JSON.stringify(output));
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