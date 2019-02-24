






var trainTime = "11:08";
var oTrainTime = moment(trainTime, "hh:mm").subtract(1, "years");
var eTrainTime = Object.values(oTrainTime)[1];
var freq = "120";
var difTime = moment().diff(moment(oTrainTime), "minutes");
var rmndr = difTime % freq;
var minAwy = freq - rmndr;
var nxtArvl = moment().add(minAwy, "minutes");
var eNxtArvl = Object.values(nxtArvl)[4].toTimeString();
var nextArrival = eNxtArvl.substring(0,5);
var maxMoment = moment.max(moment(), oTrainTime);
var eMaxMoment = Object.values(maxMoment)[4].toTimeString();
var maxTime = eMaxMoment.substring(0,5);



console.log("eTrainTime:" + eTrainTime);
console.log(difTime);
console.log(rmndr);
console.log(minAwy);
console.log(nxtArvl);
console.log(eNxtArvl);
console.log(nextArrival);
console.log(maxMoment);
console.log("maxTime" + maxTime);

if (maxTime > eTrainTime ) {
    console.log("mt greater");
} else {
    console.log("tt greater");
}





//var str = new Array(len + 1).join( character );

//var time = Object.values(b)[1];
