const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupContactRoutes = require("./app/routes/contact.routes");
const { BadRequestError } = require("./app/helpers/errors");

const db = require("./app/models");

db.mogoose.connect(config.db.url)
.then(() => {
    console.log("Connectecd to the database!");

})
.catch((error) => {
    console.log("Cannot connect to the database!", error);
    process.exit();
});

const app = express();

app.use(cors({ origin: config.app.origin}));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

setupContactRoutes(app);





app.use((req, res, next) => {
    next (new BadRequestError(404, "Resource not found"));

});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",

    });

});



app.get("/", (req,res) => {
    res.json({ message: "Welcome to contact book application." });
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});