angular.module('ratel')
  .component('home', {
    bindings: {
      links: '='
    },
    templateUrl: 'app/views/home.html',
    controller: function ($scope) {
      var ctrl = this

      var clockDiv = $('#clock')
      var timeDiv = $('#time')
      var dayDiv = $('#day')
      var dateDiv = $('#date')
      var spacerDiv = $('#spacer')
      var secondsDiv = $('#seconds')
      var tickDiv

      function getTextWidth (text, font) {
        // if given, use cached canvas for better performance
        // else, create new canvas
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
        var context = canvas.getContext('2d')
        context.font = font
        var metrics = context.measureText(text)
        return metrics.width
      }

      function getWidth_ (text, widthtofit) {
        var nofit = true
        var size = 6 * 30

        while (nofit) {
          var testsize = getTextWidth(text, size + 'px san serif')
          if (testsize < widthtofit) {
            nofit = false
          }
          size = size - 6
        }
        return size
      }

      function getWidth (text, widthoffit, bracketsize) {
        var min = 10

        function testfit (size) {
          var testsize = getTextWidth(text, size + 'px san serif')
          if (widthoffit - testsize < 20 && testsize < widthoffit) {
            return 0
          }

          if (testsize < widthoffit) {
            return 1
          } else {
            return -1
          }
        }

        return util.search(testfit, 12, 300)
      }

      function autoSizeText () {
        var elements = $('.resize')

        for (var i = 0; i < elements.length; i++) {
          var element = $(elements[i])
          var text = element.text()
          if (text) {
            var width = getWidth(text, element.width())
            console.log(width)
            element.css('font-size', width + 'px')
          }
        }
      }

      function drawclock () {
        var datetime = moment()

        var time = datetime.format('h:mm a').toLowerCase()
        timeDiv.text(time)

        var day = datetime.format('dddd')
        dayDiv.text(day)

        var date = datetime.format('MMMM Do, YYYY')
        dateDiv.text(date)

        var width = clockDiv.width()
        var second = datetime.format('s')

        var secondWidth = Math.floor(width / 60)
        var spacer = second * secondWidth

        spacerDiv.width(spacer + 'px')
        tickDiv.width(secondWidth * 2)
        tickDiv.height(secondWidth * 2)
        secondsDiv.height(secondWidth)
      }

      function resize () {
        autoSizeText()
      };

      function bindEvents () {
        drawclock()
        setInterval(drawclock, 500)
        $(window).on('resize', resize)
      };

      ctrl.$onInit = function () {
        tickDiv = $('#tick')
        bindEvents()
        resize()
      }
    }
  })
