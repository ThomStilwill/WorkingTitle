describe('util', function () {
  function createTest (targetValue) {
    return function (guess) {
      return targetValue - guess
    }
  }

  it('should 57 from 1,100', function () {
    var expected = 57
    var actual = util.search(createTest(expected), 1, 100)
    expect(actual).is.equal(expected)
  })

  it('should find 1 from 1,1', function () {
    var expected = 1
    var actual = util.search(createTest(expected), 1, 1)
    expect(actual).is.equal(expected)
  })

  it('should find 2 from 1,2', function () {
    var expected = 2
    var actual = util.search(createTest(expected), 1, 2)
    expect(actual).is.equal(expected)
  })

  it('should find 2 from 1,3', function () {
    var expected = 2
    var actual = util.search(createTest(expected), 1, 2)
    expect(actual).is.equal(expected)
  })

  it('should find 3 from 1,3', function () {
    var expected = 3
    var actual = util.search(createTest(expected), 1, 3)
    expect(actual).is.equal(expected)
  })

  it('should find 3 from 1,3', function () {
    var expected = 4
    var actual = util.search(createTest(expected), 1, 3)
    expect(actual).is.equal(expected)
  })

})
