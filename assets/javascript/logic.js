console.log("Kevya");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoUSZAFPRE0CwEe3X2B1DcuRNH34KVeds",
    authDomain: "practice-9f0f7.firebaseapp.com",
    databaseURL: "https://practice-9f0f7.firebaseio.com",
    projectId: "practice-9f0f7",
    storageBucket: "practice-9f0f7.appspot.com",
    messagingSenderId: "214881515661"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// On Click
$("#add-user").on("click", function() {

    // Get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var frequency = $("#train-frequency").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var oTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    var mTrainTime = moment(firstTrain, "hh:mm");
    var eTrainTime = Object.values(oTrainTime)[1];
    var iTrainTime = eTrainTime.substring(0,5);

    var difTime = moment().diff(moment(oTrainTime), "minutes");
    var rmndr = difTime % frequency;
    var minAwy = frequency - rmndr;
    var nxtArvl = moment().add(minAwy, "minutes");
    var eNxtArvl = Object.values(nxtArvl)[4].toTimeString();
    var nextArrival = eNxtArvl.substring(0,5);
    var maxMoment = moment.max(moment(), oTrainTime);
    var eMaxMoment = Object.values(maxMoment)[4].toTimeString();
    var maxTime = eMaxMoment.substring(0,5);

    if (maxTime > iTrainTime) {

        database.ref().push({
            nxtArr: nextArrival,
            tName: trainName,
            dest: destination,
            freq: frequency,
            minAwy: minAwy,
            time: firebase.database.ServerValue.TIMESTAMP
        });

    } else {
        
        minAwy = moment().diff(moment(mTrainTime), "minutes");
        minAwy = Math.abs(minAwy);

        database.ref().push({
            nxtArr: eTrainTime,
            tName: trainName,
            dest: destination,
            freq: frequency,
            minAwy: minAwy,
            time: firebase.database.ServerValue.TIMESTAMP
        });
    }   
});


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().tName);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().nxtArr);
    console.log(childSnapshot.val().freq);
    console.log(childSnapshot.val().minAwy);


    // full list of items to the well
    $("#trainData").append("<tr> <td> " + childSnapshot.val().tName +
        " </td><td> " + childSnapshot.val().dest +
        " </td><td> " + childSnapshot.val().freq +
        " </td><td> " + childSnapshot.val().nxtArr +
        " </td><td> " + childSnapshot.val().minAwy +
        "</td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

});



