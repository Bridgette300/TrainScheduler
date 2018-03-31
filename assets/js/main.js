// A $( document ).ready() block
$( document ).ready(function() {

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZ5_y6OHwNKQppM8TYdQ__eVxfPK8y7mE",
    authDomain: "trainschedule-539b3.firebaseapp.com",
    databaseURL: "https://trainschedule-539b3.firebaseio.com",
    projectId: "trainschedule-539b3",
    storageBucket: "trainschedule-539b3.appspot.com",
    messagingSenderId: "1360675519"
  };
  firebase.initializeApp(config);

  //store firebase database in variable
  let database = firebase.database();
  
  //global variables
  let trainName = "";
  let destination = "";
  let trainTime = "";
  let frequency = "";

  $("#add-train-btn").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    //grab data from user input
    trainName = $("#train-name-input").val().trim();
    destination = $('#destination-input').val().trim();
    trainTime = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();
 
    //check to make sure btn click is working
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
  


    // Push initial data to your Firebase database.
    database.ref().push({

        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  
});

database.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);


    $("#js-display-data").prepend("<tr class='js-row'><td class='name-display'> " + snapshot.val().trainName + "</td><td class='destination-display'> " + snapshot.val().destination + "</td><td class='trainTime-display'>  " + snapshot.val().trainTime + "</td><td class='frequency-display'>" + snapshot.val().frequency + "</td><td class='minutes-display'> " + 'minutes' + " </td></tr>");

}, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);

});

});