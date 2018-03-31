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
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().tName);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().nxtArr);
    console.log(childSnapshot.val().freq);
    console.log(childSnapshot.val().minAwy);

    // full list of items to the well
    $("#train-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
        " </span><span class='train-name'> " + childSnapshot.val().tName +
        " </span><span class='train-destination'> " + childSnapshot.val().dest +
        " </span><span class='train-frequency'> " + childSnapshot.val().freq +
        "</span><span class='first-train'>" + childSnapshot.val().nxtArr +
        "</span><span class='min-away'>" + childSnapshot.val().minAwy +
        "</span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().trainName);
//     $("#dest-display").text(snapshot.val().destination);
//     $("#freq-display").text(snapshot.val().frequency);
//     $("#first-display").text(snapshot.val().nextArrival);
//     $("#away-display").text(snapshot.val().nextArrival);
//
// });

