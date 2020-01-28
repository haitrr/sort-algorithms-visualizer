class BubleSort {
  current = 0;
  swap = 0;
  isDone() {
    return this.current == sample.length - 1 && this.swap == 0;
  }
  next() {
    if (this.current == sample.length - 1) {
      this.current = 0;
      this.swap = 0;
    }
    if (sample[this.current] > sample[this.current + 1]) {
      swap(this.current, this.current + 1);
      hightLight = [this.current, this.current + 1];
      this.swap += 1;
    }
    this.current += 1;
  }
}
