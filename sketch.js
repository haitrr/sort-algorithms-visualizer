let sel;
let algorithm;

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight)
  createAlgorithmsSelect()
  createSampleSizeSlider()
}

function generateSample() {

}

function createSampleSizeSlider() {
  slider = createSlider(10, 10000, 200);
  slider.position(250, 10);
  slider.style('width', '200px');
}

function createAlgorithmsSelect() {
  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Selection sort');
  sel.changed(mySelectEvent);
}


function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}

function draw() {
  // put drawing code here
  background(255)
  textAlign(CENTER, CENTER)
  text("Sample size", 200,20)
}

class Algorithm {

}

class SelectionSort extends Algorithm {

}