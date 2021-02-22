//img = "";
status = "";
list_of_objects = [];

function preload() {
    //img = loadImage('dog_cat.jpg'); //this is to load the dog cat image
}

function setup() {
    canvas = createCanvas(380, 380); //Code to create a canvas
    canvas.center(); //this is to center the canvas
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    console.log(video);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded); //this is to call the function and the cocossd in a variable
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; //this is used to Show the status Detecting in a label
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}


function draw() {
    image(video, 0, 0, 380, 380); //this is to identify that img is the webcam/main picture


    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
     
        for (var i = 0; i < list_of_objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+list_of_objects.length;

            fill(r,g,b);
            percent = floor(list_of_objects[i].confidence * 100);
            text(list_of_objects[i].label + " " + percent + "%", list_of_objects[i].x + 15, list_of_objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(list_of_objects[i].x, list_of_objects[i].y, list_of_objects[i].width, list_of_objects[i].height);
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    list_of_objects = results;
    console.log("---"+list_of_objects);
}