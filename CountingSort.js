class CountingSort {
  done = false;
  // since the data range is 0-sampleSize
  count = Array(sampleSize).fill(0);
  countCurrent = 0;
  current = 0;
  isDone() {
    return this.done;
  }

  next() {
    if (this.current >= sampleSize) {
      this.done = true;
      return;
    }

    // not counted yet
    if (this.current == 0) {
      // count all the number in the array
      for (let i = 0; i < sampleSize; i++) {
        this.count[sample[i]] += 1;
      }

      // find the first number to start with
      while ((this.count[this.countCurrent] = 0)) {
        this.countCurrent += 1;
      }
      sample[this.current] = this.countCurrent;
      this.count[this.countCurrent] -= 1;
      this.current += 1;
    } else {
      // extract the numbers from count
      if (this.count[this.countCurrent] > 0) {
        this.count[this.countCurrent] -= 1;
        sample[this.current] = this.countCurrent;
        this.current += 1;
      } else {
        this.countCurrent += 1;
      }
    }
    hightLight = [this.current];
  }
}
