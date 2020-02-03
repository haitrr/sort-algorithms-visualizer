class HeapSort {
  progress = { building: true, size: sampleSize, current: Math.floor(sampleSize / 2) - 1 };
  isDone() {
    return !this.progress;
  }
  next() {
    const { building, heapify, size, current, extract } = this.progress;
    if (building) {
      if (current >= 0) {
        this.progress = {
          heapify: true,
          current: current,
          size: size,
          next: { building: true, size: size, current: current - 1 },
        };
      } else {
        this.progress = { extract: true, current: sampleSize - 1 };
      }
    } else if (extract) {
      if (current >= 0) {
        swap(0, current);
        hightLight = [0, current];
        this.progress = {
          heapify: true,
          current: 0,
          size: current,
          next: { extract: true, current: current - 1 },
        };
      } else {
        this.progress = this.progress.next;
      }
    } else if (heapify) {
      this.heapify(size, current);
    }
  }

  heapify(size, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < size && sample[largest] <= sample[left]) {
      largest = left;
    }

    if (right < size && sample[largest] <= sample[right]) {
      largest = right;
    }

    if (largest != i) {
      swap(largest, i);
      hightLight = [i, largest];
      this.progress = { heapify: true, size: size, current: largest, next: this.progress.next };
    } else {
      this.progress = this.progress.next;
    }
  }
}
