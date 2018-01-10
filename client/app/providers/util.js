var util = (function () {

  function traverse (testFn, min, max) {
    var median = Math.floor((max - min + 1) / 2) + min
    var result = testFn(median)

    console.log(median)

    if (result === 0 || min === max) {
      return median
    }

    if (result > 0) {
      return traverse(testFn, median, max)
    } else {
      return traverse(testFn, min, median)
    }
  }

  function search (testFn, min, max) {
    return traverse(testFn, min, max)
  }

  return {
    search: search
  }
})()
