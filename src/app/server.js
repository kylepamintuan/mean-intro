var express = require('express');
var app = express();

app.post("/registration", (req, res) => {
    console.log(req);
});

app.post("/login", (req, res) => {
    console.log(req);
});

app.get("/user-profile", (req, res) => {
    res.send('now in user profile');
});

app.get('/', function(req, res) {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})