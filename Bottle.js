cocossd_model = "";
status = "";
objects = []

function preload() {
    img = loadImage("Bottle.jpg")
}

function setup() {
    canvas = createCanvas(360, 800);
    canvas.position(500, 400);
    cocossd_model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    cocossd_model.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    objects = results
    console.log(results)
}

function draw() {
    image(img, 0, 0, 360, 800)

    if (status != "") {
        count = 0
        for (i = 0; i < objects.length; i++) {
            percent = objects[i].confidence * 100
            label = objects[i].label
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            fill("#FF0000");
            stroke("#FF0000");
            noFill();
            rect(x, y, width, height);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            count += 1
        }
        document.getElementById("many").innerHTML = count + " objects are displayed";
        document.getElementById("status").innerHTML = "Status: displayed";
    }
}