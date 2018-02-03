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
    },
    {
      name: 'login',
      component: 'login'
    },
    {
      name: 'vue',
      templateUrl: 'app/views/vue.html'
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

    $state.go('login')
  }])
