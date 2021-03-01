var mongoose = require("mongoose");

let dbURI = "mongodb+srv://raza26032:raza26032@cluster0.ypq3m.mongodb.net/firstDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function() {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
var foodUserSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "gender": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var foodUserModel = mongoose.model("fooduser", foodUserSchema);

var foodResetPassword = new mongoose.Schema({
    "email": String,
    "otp": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var foodOtpModel = mongoose.model("foodotp", foodResetPassword);

module.exports = {
    foodUserModel: foodUserModel,
    foodOtpModel: foodOtpModel,
}