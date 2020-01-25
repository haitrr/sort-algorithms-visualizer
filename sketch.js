let sel;
let algorithm;
let slider;
let sample;
let sampleSize = 200;
let canvasWidth ;
let canvasHeigth ;

function setup() {
  // put setup code here
  canvasWidth = windowWidth
  canvasHeigth = windowHeight
  createCanvas(canvasWidth,canvasHeigth)
  createAlgorithmsSelect()
  createSampleSizeSlider()
  sample = generateSample()
}

function generateSample() {
  var max = sampleSize
  let data = []
  current = 0
  while(current < max) {
    data.push(Math.floor(Math.random()*max)+1)
    current += 1
  }
  return data;
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
  strokeWeight(1)
  text("Sample size", 200,20)
  if(sampleSize != slider.value()) {
    sampleSize = slider.value();
    sample = generateSample();
  }
  drawSample();
}

function drawSample() {
  let width = canvasWidth/ sampleSize;
  let y = 50;
  let x = 30;
  strokeWeight(width);
  stroke(0)
  sample.forEach(value => {
    let height = canvasHeigth * (value/ sampleSize);
    line(x,y,x,y+height)
    x+=width;
  });
}

class Algorithm {

}

class SelectionSort extends Algorithm {

}