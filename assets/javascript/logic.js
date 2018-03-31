// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoUSZAFPRE0CwEe3X2B1DcuRNH34KVeds",
    authDomain: "practice-9f0f7.firebaseapp.com",
    databaseURL: "https://practice-9f0f7.firebaseio.com",
    storageBucket: "practice-9f0f7.appspot.com",
    messagingSenderId: "214881515661"
};
firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();

var trainName = "empty";
var destination = "none";
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

// On Click
$("#add-user").on("click", function() {

    // Get the input values
    trainName = $("#train_name").val().trim();
    destination = $("#destinationX").val().trim();
    nextArrival = $("#firstTrain").val().trim();
    frequency = $("#frequencyX").val().trim();

    database.ref().push({
        tName: trainName,
        dest: destination,
        freq: frequency,
        nxtArr: nextArrival,
        minAwy: minutesAway,
        time: firebase.database.ServerValue.TIMESTAMP

    });

    event.preventDefault();
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {


    // full list of items to the well
    $("#train-list").append("<tr> <td> " + childSnapshot.val().tName +
        " </td><td> " + childSnapshot.val().dest +
        " </td><td> " + childSnapshot.val().freq +
        " </td><td> " + childSnapshot.val().nxtArr +
        " </td><td> " + childSnapshot.val().minAwy + " </td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    // Change the HTML to reflect
    $("#name-display").appendChild(snapshot.val().tName);
    $("#dest-display").text(snapshot.val().dest);
    $("#freq-display").text(snapshot.val().freq);
    $("#first-display").text(snapshot.val().nxtArr);
    $("#away-display").text(snapshot.val().minAwy);
});
