// Initialize Firebase
const config = {
    apiKey: "AIzaSyDoUSZAFPRE0CwEe3X2B1DcuRNH34KVeds",
    authDomain: "practice-9f0f7.firebaseapp.com",
    databaseURL: "https://practice-9f0f7.firebaseio.com",
    projectId: "practice-9f0f7",
    storageBucket: "practice-9f0f7.appspot.com",
    messagingSenderId: "214881515661"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

// On Click
$("#add-user").on("click", function() {

    // Get the input values
    let trainName = $("#train-name").val().trim(),
        destination = $("#train-destination").val().trim(),
        frequency = $("#train-frequency").val().trim(),
        firstTrain = $("#first-train").val().trim(),
        oTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years"),
        mTrainTime = moment(firstTrain, "hh:mm"),
        eTrainTime = Object.values(oTrainTime)[1],
        iTrainTime = eTrainTime.substring(0,5),
        difTime = moment().diff(moment(oTrainTime), "minutes"),
        rmndr = difTime % frequency,
        minAwy = frequency - rmndr,
        nxtArvl = moment().add(minAwy, "minutes"),
        eNxtArvl = Object.values(nxtArvl)[4].toTimeString(),
        nextArrival = eNxtArvl.substring(0,5),
        maxMoment = moment.max(moment(), oTrainTime),
        eMaxMoment = Object.values(maxMoment)[4].toTimeString(),
        maxTime = eMaxMoment.substring(0,5);

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


        database.ref().push({
            nxtArr: eNxtArvl,
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
    console.log(`Train Name: ${childSnapshot.val().tName}`);
    console.log(`Destination: ${childSnapshot.val().dest}`);
    console.log(`Next Arrival: ${childSnapshot.val().nxtArr}`);
    console.log(`Frequency ${childSnapshot.val().freq}`);
    console.log(`Minutes Away: ${childSnapshot.val().minAwy}`);

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