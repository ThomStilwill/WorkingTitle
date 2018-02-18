
var util = require('./util.js')
var chai = require('chai')
var expect = chai.expect

describe('utiltests', function () {

  function createTest (targetValue) {
    return function (guess) {
      return targetValue - guess
    }
  }

  var data = [
    {key: 0, state: 'CT', name: 'Smith'},
    {key: 1, state: 'NY', name: 'Smith'},
    {key: 2, state: 'MN', name: 'Smith'},
    {key: 3, state: 'MA', name: 'Smith'},
    {key: 4, state: 'RI', name: 'Smith'},
    {key: 5, state: 'CT', name: 'Todd'},
    {key: 6, state: 'CT', name: 'Smith'},
    {key: 7, state: 'CT', name: 'Smith'}
  ]

  it('multple predicates', function () {
    var predicate = util.where({key: 3})
    var actual = util.find(predicate, data).state
    var predicate2 = util.where({key: 0})
    var actual2 = util.find(predicate2, data).state
    expect(actual2).is.equal('CT')
    expect(actual).is.equal('MA')
  })

  it('should find 1 from 1,1', function () {
    var expected = 1 
    var actual = util.search(createTest(expected), 1, 1)
    expect(actual).is.equal(expected)
  })

  it.only('should find 1 from 1,2', function () {
    var expected = 1
    var actual = util.search(createTest(expected), 1, 2)
    expect(actual).is.equal(expected)
  })

  it('should find 2 from 1,2', function () {
    var expected = 2
    var actual = util.search(createTest(expected), 1, 2)
    expect(actual).is.equal(expected)
  })

  it('should find 1 from 1,3', function () {
    var expected = 1
    var actual = util.search(createTest(expected), 1, 3)
    expect(actual).is.equal(expected)
  })

  it('should find 2 from 1,3', function () {
    var expected = 2
    var actual = util.search(createTest(expected), 1, 3)
    expect(actual).is.equal(expected)
  })

  it('should 57 from 1,100', function () {
    var expected = 57
    var actual = util.search(createTest(expected), 1, 100)
    expect(actual).is.equal(expected)
  })
})
