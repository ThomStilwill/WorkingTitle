var util = (function () {

  function traverse (testFn, min, max, lower, upper) {
    var median = Math.floor((max - min + 1) / 2) + min
    var result = testFn(median, lower, upper)

    if (result === 0 || min > max - 1 || result >= min || median === min + 1) {
      return median
    }

    if (result > 0) {
      return traverse(testFn, median, max, lower, upper)
    } else {
      return traverse(testFn, min, median, lower, upper)
    }
  }

  function search (testFn, min, max) {
    return traverse(testFn, min, max, min, max)
  }

  return {
    search: search
  }
})()
