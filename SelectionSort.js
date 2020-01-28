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
    sample.splice(this.current, 0, min);
    hightLight = [this.current, minIndex];
    this.current += 1;
  }
}
