class InsertionSort {
  current = 0;
  isDone() {
    return this.current == sample.length;
  }
  next() {
    for (let i = 0; i < this.current; i++) {
      if (sample[this.current] < sample[i]) {
        let temp = sample[this.current];
        sample.splice(this.current, 1);
        sample.splice(i, 0, temp);
        hightLight = [this.current, i];
      }
    }
    this.current += 1;
  }
}
