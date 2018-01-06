angular.module('ratel', ['ui.router'])
  .controller('basecontroller', ['$scope', function ($scope) {
    $scope.title = 'Stilwill.net'
    $scope.version = '0.0.1'
    $scope.year = (new Date()).getFullYear()
    $scope.theme = 'theme-light'
  }])

angular.module('ratel')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/')
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    })

    var states = [{
      name: 'home',
      component: 'home',
      resolve: {
        links: function (LinkService) {
          return LinkService.fetch()
        }
      }
    },
    {
      name: 'persons',
      component: 'persons',
      resolve: {
        model: function (PersonService) {
          return PersonService.fetch()
        }
      }
    },
    {
      name: 'about',
      component: 'about'
    },
    {
      name: 'clock',
      component: 'clock'
    },
    {
      name: 'tags',
      component: 'tags'
    }
    ]

    states.forEach(function (state) {
      $stateProvider.state(state)
    })
  }])
  .run([function () {

  }])
  .run(['$state', '$trace', '$transitions', function ($state, $trace, $transitions) {
    // $trace.enable('TRANSITION');

    $state.defaultErrorHandler(function () {
      console.log('Default error handler fired!')
    })

    $transitions.onStart({}, function (transition) {
      // console.log('Starting transition!');
      // transition.promise.finally(console.log('Transition promise finally fired!'));
    })
    $transitions.onError({}, function (transition) {
      console.log('Transition erred!')
    })

    $state.go('home')
  }])

angular.module('ratel')
  .service('LinkService', ['$q', '$http', '$log', function ($q, $http) {
    function fetch () {
      var url = `api/links`

      return $http.get(url)
        .then(function (result) {
          return result.data
        })
    }

    function tags () {
      var url = `api/tags`

      return $http.get(url)
        .then(function (result) {
          return result.data
        })
    }

    return {
      fetch: fetch,
      tags: tags
    }
  }])

angular.module('ratel')
  .service('MenuService', ['$http', '$log', function ($http, $log) {
    function fetch () {
      var url = `api/menus`
      return $http.get(url)
        .then(function (result) {
          return result.data.length > 0 ? result.data : null
        })
    }

    return {
      fetch: fetch
    }
  }])

angular.module('ratel')
  .service('PersonService', ['$q', '$http', '$log', function ($q, $http, $log) {
    function fetch (queries) {
      var url = `api/persons`

      var fragments = []
      if (queries) {
        queries.forEach(query => {
          var field, operator, value
          if (query.operator === 'q=' && query.value) {
            field = '',
            operator = query.operator,
            value = query.value
          } else if ((query.field && query.operator && query.value)) {
            field = query.field,
            operator = query.operator,
            value = query.value
          }
          var fragment = `${field}${operator}${value}`
          fragments.push(fragment)
        })

        url += '?' + fragments.join('&')
      }

      $log.log(url)
      return $http.get(url)
        .then(function (result) {
          return result.data
        })
    }

    function get (id) {
      var url = `api/persons?id=${id}`
      return $http.get(url)
        .then(function (result) {
          return result.data.length > 0 ? result.data[0] : null
        })
    }

    return {
      fetch: fetch,
      get: get
    }
  }])

angular.module('ratel')
  .component('about', {
    templateUrl: 'app/views/about.html',
    controller: function ($scope) {
      const ctrl = this
    }
  })

angular.module('ratel')
  .component('clock', {
    templateUrl: 'app/views/clock.html',
    controller: function ($scope) {
      const ctrl = this

      var currentLang

      function formatArray (array) {
        return array.join('<br/>')
      }

      function calendarHtml () {
        var arr = []
        arr.push(moment().subtract('days', 10).calendar())
        arr.push(moment().subtract('days', 6).calendar())
        arr.push(moment().subtract('days', 3).calendar())
        arr.push(moment().subtract('days', 1).calendar())
        arr.push(moment().calendar())
        arr.push(moment().add('days', 1).calendar())
        arr.push(moment().add('days', 3).calendar())
        arr.push(moment().add('days', 10).calendar())
        return formatArray(arr)
      }

      function formatHtml () {
        var arr = []
        arr.push(moment().format('MMMM Do YYYY, h:mm:ss a'))
        arr.push(moment().format('dddd'))
        arr.push(moment().format('MMM Do YY'))
        arr.push(moment().format('YYYY [escaped] YYYY'))
        arr.push(moment().format())
        return formatArray(arr)
      }

      function fromHtml () {
        var arr = []
        arr.push(moment('20111031', 'YYYYMMDD').fromNow())
        arr.push(moment('20120620', 'YYYYMMDD').fromNow())
        arr.push(moment().startOf('day').fromNow())
        arr.push(moment().endOf('day').fromNow())
        arr.push(moment().startOf('hour').fromNow())
        return formatArray(arr)
      }

      function langHtml () {
        var arr = []
        arr.push(moment().format('L'))
        arr.push(moment().format('l'))
        arr.push(moment().format('LL'))
        arr.push(moment().format('ll'))
        arr.push(moment().format('LLL'))
        arr.push(moment().format('lll'))
        arr.push(moment().format('LLLL'))
        arr.push(moment().format('llll'))
        return formatArray(arr)
      }

      function update () {
        moment.lang(currentLang)

        $('#js-format').html(formatHtml())
        $('#js-from-now').html(fromHtml())
        $('#js-calendar').html(calendarHtml())
        $('#js-lang').html(langHtml())

        var now = moment(),
          second = now.seconds() * 6,
          minute = now.minutes() * 6 + second / 60,
          hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12

        $('#hour').css('transform', 'rotate(' + hour + 'deg)')
        $('#minute').css('transform', 'rotate(' + minute + 'deg)')
        $('#second').css('transform', 'rotate(' + second + 'deg)')
      }

      function timedUpdate () {
        update()
        setTimeout(timedUpdate, 1000)
      }

      timedUpdate()

      var init = function () {
        var dom = $(this)
        currentLang = dom.data('lang')
        $('[data-lang]').removeClass('active')
        dom.addClass('active')
        update()
      }

      init()
    }
  })

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

      function getWidth (text, widthtofit) {
        var nofit = true
        var size = 124

        while (nofit) {
          var testsize = getTextWidth(text, size + 'px san serif')
          if (testsize < widthtofit) {
            nofit = false
          }
          size--
        }
        return size
      }

      function autoSizeText () {
        var element = $('.resize')

        var text = element.text()
        if (text) {
          var width = getWidth(text, element.width())
          console.log(width)
          element.css('font-size', width + 'px')
        }
      };

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

angular.module('ratel')
  .component('login', {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/login.html',
    controller: function ($scope) {
      const ctrl = this
    }
  })

angular.module('ratel')
  .component('menu', {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/menu.html',
    controller: function ($scope, MenuService) {
      const ctrl = this

      MenuService.fetch()
        .then(function (menus) {
          ctrl.menus = menus
        })
    }
  })

angular.module('ratel')
  .component('persons', {
    templateUrl: 'app/views/persons.html',
    controller: function ($scope, PersonService) {
      const ctrl = this

      ctrl.queries = []

      function createQuery () {
        return {
          field: '',
          operator: '',
          value: ''
        }
      }

      ctrl.addQuery = function () {
        ctrl.queries.push(createQuery())
      }

      ctrl.deleteQuery = function (index) {
        ctrl.queries.splice(index, 1)
      }

      ctrl.$onInit = function () {
        ctrl.addQuery()

        PersonService.get(0)
          .then(function (person) {
            if (person) {
              ctrl.fields = Object.keys(person)
            }
          })
      }

      ctrl.querytopstyle = function () {
        var top = 5 + (40 * ctrl.queries.length)
        return {'top': top + 'px'}
      }

      function query () {
        PersonService.fetch(ctrl.queries)
          .then(function (people) {
            ctrl.people = people
          })
      }

      $scope.$watch('$ctrl.queries', query, true)
    }
  })

angular.module('ratel')
  .component('tags', {
    templateUrl: 'app/views/tags.html',
    controller: function ($scope, LinkService) {
      const ctrl = this

      var tagContainer
      var canvas
      var canvasCtx

      var resetCanvas = function () {
        canvasCtx.canvas.width = tagContainer.width()
        canvasCtx.canvas.height = tagContainer.height()
        var options = {
          textColour: null,
          outlineColour: '#C3C3C3',
          outlineMethod: 'classic',
          outlineThickness: 1,
          outlineOffset: 4,
          textHeight: 36,
          textFont: 'Century Gothic',
          depth: 0.99,
          maxSpeed: 0.09,
          minSpeed: 0.0,
          minBrightness: 0.3,
          reverse: true,
          frontSelect: true,
          shuffleTags: true,
          initial: [0.09, 0.05],
          weight: true,
          weightFrom: 'weight',
          weightMode: 'size',
          weightSizeMin: 14,
          weightSizeMax: 24,
          imageMode: 'both'
        }

        if (!canvas.tagcanvas(options, 'tags')) {
          // something went wrong, hide the canvas container
          tagContainer.hide()
        }
      }

      var registerEvents = function () {
        window.onresize = function () {
          resetCanvas()
        }
      }

      var addLink = function (title, href, color, src, weight) {
        if (!color) {
          color = '#bbb'
        }
        if (!weight) {
          weight = 1
        }

        var a = $(document.createElement('a'))
          .attr('href', 'http://' + href)
          .attr('weight', weight)
          .css('color', color)

        a.append(title)

        if (src) {
          a.append('<img src="data:image/x-icon;base64,' + src + '"></img>')
        }

        $('#tags').append(a)
      }

      var load = function (tags) {
        $.each(tags, function () {
          var group = this
          var color = group.color

          $.each(group.tags, function () {
            var tag = this
            var src = tag.src || null

            if (tag.weight) {
              addLink(tag.title, tag.url, color, src, tag.weight)
            } else {
              addLink(tag.title, tag.url, color, src)
            }
          })
        })
      }

      ctrl.$onInit = function () {
        tagContainer = $('#tag-container')
        canvas = $('#tag-canvas')
        canvasCtx = canvas[0].getContext('2d')

        LinkService.tags()
          .then(function (tags) {
            $('#tags').empty()
            load(tags)
            resetCanvas()
            registerEvents()
          })
      }
    }
  })

//# sourceMappingURL=../maps/app.js.map
