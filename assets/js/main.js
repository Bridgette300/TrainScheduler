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
   let tName = console.log(snapshot.val().trainName);
   let tDesi = console.log(snapshot.val().destination);
     let trainT = console.log(snapshot.val().trainTime);
    let tFrequency = console.log(snapshot.val().frequency);

    let trainArr = trainT.split(':');
    let trainMin = moment().hours(trainArr[0]).minutes(trainArr[1]);
    let maxMoment = moment.max(moment(), trainMin);
    let tMinutes;
    let tArrival;

    if (maxMoment === trainMin) {
      tArrival = trainMin.format("hh:mm A");
      tMinutes = trainMin.diff(moment(), "minutes");
    } else {
      let differenceTimes = moment().diff(trainMin, "minutes");
      let tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      tArrival = moment().add(tMinutes, "m").format("mm:hh A");
    }


    $("#js-display-data").prepend("<tr class='js-row'><td class='name-display'> " + tName + "</td><td class='destination-display'> " + tDesi + "</td><td class='frequency-display'>  " + tFrequency + "</td><td class='arrival-display'>" + tArrival + "</td><td class='minutesAway-display'> " + tMinutes + " </td></tr>");

}, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);

});

});