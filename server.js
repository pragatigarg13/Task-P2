const express = require('express');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/subscribe", (req, res) => {

    const email = req.body.email;
    console.log("Subscriber email:", email);
    const msg = {
        to: email,
        from: "pragatigarg1392007@gmail.com",
        subject: "Welcome to DEV@Deakin",
        text: "Welcome to DEV@Deakin! Thank you for subscribing."
    };

    sgMail.send(msg)
        .then(() => {
            console.log("Email sent successfully");
            console.log("Status: 202");
            res.status(202).send("Welcome email sent successfully");
        })
        .catch((error) => {
            console.log("Error sending email:", error);
            res.status(500).send("Failed to send welcome email");
        });

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});