class QuickSort {
  progress = {
    left: 0,
    right: sampleSize - 1,
    currentLeft: 0,
    currentRight: sampleSize - 1,
    pivot: Math.floor(Math.random() * (sampleSize - 1)),
  };
  isDone() {
    return !this.progress;
  }

  randomPivot(left, right) {
    return Math.floor(Math.random() * (right - left)) + left;
  }

  next() {
    let { left, right, partition, currentLeft, currentRight, pivot } = this.progress;
    // there is only element or the partition already done
    if (left == right || currentLeft > currentRight) {
      this.progress = this.progress.next;
      return
    }

    // find in the left the next element that bigger than pivot
    while (sample[currentLeft] <= sample[pivot] && currentLeft < pivot) {
      currentLeft += 1;
    }

    // find in the right the next element that smaller than pivot
    while (sample[currentRight] >= sample[pivot] && currentRight > pivot) {
      currentRight -= 1;
    }


    // if found both swap them so the smaller is on the left and the bigger on the right
    if (currentLeft < pivot && currentRight > pivot) {
      swap(currentLeft, currentRight);
      hightLight = [currentLeft, currentRight, pivot];
      this.progress.currentLeft = currentLeft;
      this.progress.currentRight = currentRight;
      return;
    }

    // found only smaller element in the right
    // which mean on the left there is only smallers and okay already
    // swap the pivot with the bigger element
    // set the right curso to the pivot so next time we only search on the left
    if (currentLeft === pivot && currentRight > pivot) {
      swap(pivot, currentRight);
      hightLight = [pivot, currentRight];
      this.progress.pivot = currentRight;
      this.progress.currentLeft = currentLeft;
      this.progress.currentRight = currentRight;
      return;
    }

    // found only bigger element in the left
    // which mean on the right there is only biggers and okay already
    // swap the pivot with the bigger element
    // set the left cursor to the pivot so next time we only search on the right
    if (currentRight === pivot && currentLeft < pivot) {
      swap(pivot, currentLeft);
      hightLight = [pivot, currentLeft]
      this.progress.pivot = currentLeft;
      this.progress.currentLeft = currentLeft;
      this.progress.currentRight = currentRight;
      return;
    }

    // parition the left and the right section
    let leftSection;
    if (pivot > 0) {
      leftSection = {
        left,
        right: pivot - 1,
        currentLeft: left,
        currentRight: pivot - 1,
        pivot: this.randomPivot(left, pivot - 1),
      };
    }

    let rightSection;
    if (pivot < right) {
      rightSection = {
        pivot: this.randomPivot(pivot + 1, right),
        left: pivot + 1,
        right,
        currentLeft: pivot + 1,
        currentRight: right,
      };
    }

    this.progress = this.progress.next;

    if (rightSection) {
      this.progress = { ...rightSection, next: this.progress };
    }
    if (leftSection) {
      this.progress = { ...leftSection, next: this.progress };
    }
  }
}
