let sel;
let algorithm;
let slider;
let sample;
let sampleSize = 200;
let speedSlider;
let canvasWidth;
let running = false;
let hightLight = [];
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
  createStopButton();
  algorithm = new SelectionSort();
  sample = generateSample();
}

function createStartButton() {
  button = createButton('Start');
  button.position(280, 10);
  button.mousePressed(onStartButtonPressed);
}

function createStopButton() {
  stopButton = createButton('Stop');
  stopButton.position(280, 40);
  stopButton.mousePressed(onStopButtonPressed);
  stopButton.attribute('disabled', 'true');
}

function onStopButtonPressed() {
  running = false;
  stopButton.attribute('disabled', 'true');
  button.removeAttribute('disabled');
  slider.removeAttribute('disabled');
}

function onStartButtonPressed() {
  // start sorting
  running = true;
  button.attribute('disabled', 'true');
  slider.attribute('disabled', 'true');
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
  slider = createSlider(10, 10000, 200);
  slider.position(100, 40);
  slider.style('width', '170px');
}

function createSpeedSlider() {
  speedSlider = createSlider(1, 3000, 59);
  speedSlider.position(170, 10);
  speedSlider.style('width', '100px');
}

function createAlgorithmsSelect() {
  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Selection sort');
  sel.option('Bubble sort');
  sel.option('Insertion sort');
  sel.option('Merge sort');
  sel.option('Quick sort');
  sel.option('Heap sort');
  sel.changed(createAlgorithm);
}

function createAlgorithm() {
  let item = sel.value();
  switch (item) {
    case 'Selection sort':
      algorithm = new SelectionSort();
      break;
    case 'Bubble sort':
      algorithm = new BubleSort();
      break;
    case 'Insertion sort':
      algorithm = new InsertionSort();
      break;

    case 'Merge sort':
      algorithm = new MergeSort();
      break;
    case 'Quick sort':
      algorithm = new QuickSort();
      break;
    case 'Heap sort':
      algorithm = new HeapSort();
      break;
  }

  running = false;
}

function draw() {
  let speed = speedSlider.value();
  frameRate(60);
  // put drawing code here
  background(255);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  stroke(0);
  text('Sample size', 50, 50);
  text('Speed', 140, 20);
  if (sampleSize != slider.value()) {
    sampleSize = slider.value();
    sample = generateSample();
  }

  if (speed < 60) {
    const chance = Math.random();
    if (chance < speed / 60) {
      run();
    }
  } else {
    let times = Math.ceil(speed / 60);
    for (let i = 0; i < times; i += 1) {
      run();
    }
  }
  drawSample();
}

function run() {
  if (!algorithm.isDone() && running) {
    algorithm.next();
  } else {
    onStopButtonPressed();
  }
}

function drawSample() {
  let width = canvasWidth / sampleSize;
  let y = canvasHeigth;
  let x = 0;
  strokeWeight(width);
  sample.forEach((value, index) => {
    stroke(0);
    if (hightLight.includes(index)) {
      stroke('red');
    }
    let height = (canvasHeigth - 100) * (value / sampleSize);
    line(x, y, x, y - height);
    x += width;
  });
}

function swap(index1, index2) {
  // console.log(`swapping ${sample[index1]} and ${sample[index2]}`)
  let temp = sample[index1];
  sample[index1] = sample[index2];
  sample[index2] = temp;
}
