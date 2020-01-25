let sel;
let algorithm;
let slider;
let sample;
let sampleSize = 200;
let canvasWidth;
let canvasHeigth;

function setup() {
  // put setup code here
  canvasWidth = windowWidth;
  canvasHeigth = windowHeight;
  createCanvas(canvasWidth, canvasHeigth);
  createAlgorithmsSelect();
  createSampleSizeSlider();
  createStartButton();
  algorithm = new SelectionSort();
  sample = generateSample();
}

function createStartButton() {
  button = createButton('Start');
  button.position(500, 10);
  button.mousePressed(onStartButtonPressed);
}

function onStartButtonPressed() {
  // start sorting
}

function generateSample() {
  var max = sampleSize;
  let data = [];
  current = 0;
  while (current < max) {
    data.push(Math.floor(Math.random() * max) + 1);
    current += 1;
  }
  createAlgorithm();
  return data;
}

function createSampleSizeSlider() {
  slider = createSlider(50, 10000, 200);
  slider.position(250, 10);
  slider.style('width', '200px');
}

function createAlgorithmsSelect() {
  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Selection sort');
  sel.changed(createAlgorithm);
}

function createAlgorithm() {
  let item = sel.value();
  if(item == 'Selection sort') {
    algorithm = new SelectionSort();
  }
}

function draw() {
  frameRate(30);
  // put drawing code here
  background(255);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  text('Sample size', 200, 20);
  if (sampleSize != slider.value()) {
    sampleSize = slider.value();
    sample = generateSample();
  }

  if(!algorithm.isDone()) {
    algorithm.next();
  }
  drawSample();
}

function drawSample() {
  let width = canvasWidth / sampleSize;
  let y = 50;
  let x = 0;
  strokeWeight(width);
  stroke(0);
  sample.forEach((value) => {
    let height = canvasHeigth * (value / sampleSize);
    line(x, y, x, y + height);
    x += width;
  });
}

class SelectionSort {
  current = 0;

  isDone() {
    return this.current == sample.length;
  }
  next() {
    let min = sample[this.current];
    let minIndex = this.current;
    for (let i = this.current; i < sample.length; i++) {
      if (sample[i] < min) {
        min = sample[i];
        minIndex = i;
      }
    }
    sample.splice(minIndex, 1);
    sample.splice(this.current,0,min);
    this.current += 1;
  }
}
