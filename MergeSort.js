class MergeSort {
  progress = {left: 0, right: sampleSize - 1};
  isDone() {
    return !this.progress;
  }
  merge() {
    let {left, right, currentLeft, currentRight} = this.progress;
    let middle = Math.floor((right + left) / 2);
    if (currentLeft < currentRight && currentRight <= right) {
      if (sample[currentLeft] > sample[currentRight]) {
        let temp = sample[currentRight];
        while (currentLeft < currentRight) {
          sample[currentRight] = sample[currentRight - 1];
          currentRight -= 1;
        }
        sample[currentLeft] = temp;
        hightLight = [this.progress.currentLeft];
        this.progress.currentLeft += 1;
        this.progress.currentRight += 1;
      }
      else {
        hightLight = [this.progress.currentLeft];
        this.progress.currentLeft += 1;
      }
    }
    else {
      this.progress = this.progress.next;
    }
  }
  next() {
    const {left, right, merge, currentLeft, currentRight} = this.progress;
    let middle = Math.floor((right + left) / 2);
    if (merge) {
      this.merge();
      return;
    }
    if (right > left) {
      this.progress.next = {
        left: left,
        right: middle,
        next: {
          left: middle + 1,
          right: right,
          next: {
            merge: true,
            currentLeft: left,
            currentRight: middle + 1,
            left: left,
            right: right,
            next: this.progress.next,
          },
        },
      };
    }
    hightLight = [left, right];
    this.progress = this.progress.next;
  }
}
