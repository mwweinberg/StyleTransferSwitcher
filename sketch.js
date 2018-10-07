let video;
let styleMountain;
let styleFuchun;
let resultImg;
let fuchunButton;
let mountainButton;
let fuchunHtmlButton;
let mountainHtmlButton;

function fuchunPress() {
    styleFuchun.transfer(gotResultFuchun);
}

function mountainPress() {
    styleMountain.transfer(gotResultMountain);
}

function setup() {
    //the .parent creates a dom element with that label
    createCanvas(640, 480).parent('canvasContainer');

    //grabs video from webcam
    video = createCapture(VIDEO);
    //hides the original video because all you care about is the
    //tranformed video
    video.hide();

    //creates the image item
    resultImg = createImg('');
    //hides it
    resultImg.hide();

    //tells ml5 where to find the model, where do get the input,
    //and triggers a callback function
    styleMountain = ml5.styleTransfer('models/mountainclimber', video, modelLoaded);
    styleFuchun = ml5.styleTransfer('models/fuchun', video, modelLoaded);

    fuchunHtmlButton = select('#fuchunHtmlButton');
    fuchunHtmlButton.mousePressed(fuchunPress);

    mountainHtmlButton = select('#mountainHtmlButton');
    mountainHtmlButton.mousePressed(mountainPress);

}

//the image is hidden in the other functions so that it
//can be drawn here
function draw() {
    image(resultImg, 0, 0, 640, 480);
}

//this triggers when the model loads to initiate gotResult
function modelLoaded() {
    //once the models have loaded
    //selects the item in the html with the label 'status'
    //and changes the html to new text
    if (styleFuchun.ready && styleMountain.ready) {
    select('#status').html('Choose an image from the SMK Open Collection below');
    }

}

//this just keeps looping and updating the image
function gotResultFuchun(err, img) {
    //adds the atribute of 'src' to the object resultImg
    resultImg.attribute('src', img.src);
    //keeps doing the transfer
    styleFuchun.transfer(gotResultFuchun);
}

//this just keeps looping and updating the image
function gotResultMountain(err, img) {
    //adds the atribute of 'src' to the object resultImg
    resultImg.attribute('src', img.src);
    //keeps doing the transfer
    styleMountain.transfer(gotResultMountain);
}
