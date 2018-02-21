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

  function where (spec, test) {
    if (!test) {
      return function _where (tst) {
        return where(spec, tst)
      }
    }

    for (var k in spec) {
      if (spec.hasOwnProperty(k)) {
        if (spec[k] !== test[k]) {
          return false
        }
      }
    }
    return true
  }

  function seek (predicate, obj) {
    if (Object(obj) !== obj) {
      return null
    }

    if (predicate(obj)) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var result = seek(predicate, obj[i])
        if (result) {
          return result
        }
      }
    }
  }

  function find (predicate, list) {
    var i = 0
    while (i < list.length) {
      var result = predicate(list[i])
      if (result) {
        return list[i]
      }
      i++
    }
    return null
  }

  return {
    search: search,
    where: where,
    seek: seek,
    find: find,
    test: function () {
      console.log('test')
    }
  }
})()

// module.exports = util
