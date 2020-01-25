let sel;
let algorithm;
let slider;
let sample;
let sampleSize = 200;
let speedSlider;
let canvasWidth;
let running = false;
let hightLight = []
let canvasHeigth;
let stopButton;

function setup() {
  // put setup code here
  canvasWidth = windowWidth;
  canvasHeigth = windowHeight;
  createCanvas(canvasWidth, canvasHeigth);
  createAlgorithmsSelect();
  createSampleSizeSlider();
  createSpeedSlider();
  createStartButton();
  createStopButton()
  algorithm = new SelectionSort();
  sample = generateSample();
}

function createStartButton() {
  button = createButton('Start');
  button.position(500, 10);
  button.mousePressed(onStartButtonPressed);
}

function createStopButton() {
  stopButton = createButton('Stop')
  stopButton.position(600, 10)
  stopButton.mousePressed(onStopButtonPressed);
  stopButton.attribute('disabled','true');
}

function onStopButtonPressed() {
  running = false
  stopButton.attribute('disabled','true');
  button.removeAttribute('disabled');
  slider.removeAttribute('disabled');
}
 
function onStartButtonPressed() {
  // start sorting
  running = true;
  button.attribute('disabled','true');
  slider.attribute('disabled','true');
  stopButton.removeAttribute('disabled');
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


function createSpeedSlider() {
  speedSlider = createSlider(1, 60, 60);
  speedSlider.position(750, 10);
  speedSlider.style('width', '200px');
}

function createAlgorithmsSelect() {
  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Selection sort');
  sel.option('Bubble sort');
  sel.changed(createAlgorithm);
}

function createAlgorithm() {
  let item = sel.value();
  if(item == 'Selection sort') {
    algorithm = new SelectionSort();
  }

  if(item == 'Bubble sort') {
    algorithm = new BubleSort();
  }
  running = false
}

function draw() {
  let speed = speedSlider.value()
  frameRate(speed);
  // put drawing code here
  background(255);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  stroke(0)
  text('Sample size', 200, 20);
  text('Speed', 700, 20);
  if (sampleSize != slider.value()) {
    sampleSize = slider.value();
    sample = generateSample();
  }

  if(!algorithm.isDone() && running) {
    algorithm.next();
  }
  else {
    onStopButtonPressed()
  }
  drawSample();
}

function drawSample() {
  let width = canvasWidth / sampleSize;
  let y = canvasHeigth;
  let x = 0;
  strokeWeight(width);
  sample.forEach((value, index) => {
    stroke(0);
    if(hightLight.includes(index)) {
      stroke('red')
    }
    let height = (canvasHeigth -50) * (value / sampleSize);
    line(x, y, x, y - height);
    x += width;
  });
}

function swap(index1, index2) {
  let temp = sample[index1]
  sample[index1]  = sample[index2]
  sample[index2] = temp
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
    hightLight = [this.current, minIndex]
    this.current += 1;
  }
}

class BubleSort {
  current = 0
  swap = 0
  isDone() {
    return this.current == sample.length - 1 && this.swap == 0
  }

  next() {
    if(this.current == sample.length- 1)  {
      this.current =0
      this.swap = 0
    }
    if(sample[this.current] > sample[this.current + 1]) {
      swap(this.current, this.current+1)
      hightLight = [this.current, this.current+1]
      this.swap += 1
    }
    this.current += 1
  }
}
