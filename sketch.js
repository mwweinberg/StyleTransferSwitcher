let video;
let styleMountain;
let styleFuchun;
let resultImg;
let fuchunButton;
let mountainButton;

function fuchunPress() {
    styleFuchun.transfer(gotResultFuchun);
}

function mountainPress() {
    styleMountain.transfer(gotResultMountain);
}

function setup() {
    //the .parent creates a dom element with that label
    createCanvas(320, 240).parent('canvasContainer');

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

    //this is the button to choose Fuchun model
    fuchunButton = createButton('Fuchun');
    //and the action that is activated when the button is pressed
    fuchunButton.mousePressed(fuchunPress);

    //this is the button to choose Fuchun model
    mountainButton = createButton('A Mountain Climber');
    //and the action that is activated when the button is pressed
    mountainButton.mousePressed(mountainPress);


}

//the image is hidden in the other functions so that it
//can be drawn here
function draw() {
    image(resultImg, 0, 0, 320, 240);
}

//this triggers when the model loads to initiate gotResult
function modelLoaded() {
    //selects the item in the html with the label 'status'
    //and changes the html to new text
    select('#status').html('Robots Assembled');

    //TODO: I think this should be happen in the *Press functions above
    //initiates the style transfer process
    //style.transfer(gotResult);
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
