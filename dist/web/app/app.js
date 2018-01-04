angular.module('ratel', ['ui.router'])
.controller('basecontroller',['$scope',function($scope){
    $scope.title='Stilwill.net'
    $scope.version = '0.0.1'
    $scope.year = (new Date()).getFullYear()
    $scope.theme = "theme-light"

}]);

angular.module('ratel')
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {

   $urlRouterProvider.otherwise('/');
   $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
   
   var states = [
        {  name: 'home',
            component: 'home',
            resolve: {
                links: function(LinkService){
                    return LinkService.fetch();
                }
            }
        },
        {  name: 'persons',
           component: 'persons',
           resolve: {
               model: function(PersonService){
                   return PersonService.fetch();
               }
           }
       },
       {  name: 'about',
       component: 'about'
   }
    ]

    states.forEach(function(state){
        $stateProvider.state(state);
    })

}])
.run([ function() {
    
  }])
.run(['$state', '$trace', '$transitions', function($state,$trace,$transitions) {
    //$trace.enable('TRANSITION');

    $state.defaultErrorHandler(function() {
        console.log('Default error handler fired!');
    });

    $transitions.onStart({}, function(transition) {
        //console.log('Starting transition!');
        //transition.promise.finally(console.log('Transition promise finally fired!'));
    });
    $transitions.onError({}, function(transition) {
        console.log('Transition erred!');
    });

    $state.go('home')
}])


angular.module('ratel')
.service('LinkService', ['$q','$http','$log', function($q,$http,$log){

    function fetch(){
        var url = `api/links`
       
        return $http.get(url)
                    .then(function(result){
                        return result.data;
                    });
    }

    return {
        fetch: fetch
    }
}])

angular.module('ratel')
.service('MenuService', ['$http','$log', function($http,$log){

    function fetch(){
        var url = `api/menus`
        return $http.get(url)
                    .then(function(result){
                        $log.log(result.data);
                        return result.data.length > 0 ? result.data : null;
                    });
    }

    return {
        fetch: fetch
    }
}])
angular.module('ratel')
.service('PersonService', ['$q','$http','$log', function($q,$http,$log){

    function fetch(queries){
        var url = `api/persons`

        var fragments = [];
        if(queries){
            queries.forEach(query => {
                var field,operator,value;
                if(query.operator === 'q=' && query.value){
                    field = '',
                    operator = query.operator,
                    value = query.value
                } else if((query.field && query.operator && query.value)) {
        
                    field = query.field,
                    operator = query.operator,
                    value = query.value
                }
                var fragment = `${field}${operator}${value}`
                fragments.push(fragment)
            });
        
            url += '?' + fragments.join('&');
        }
        
        $log.log(url)
        return $http.get(url)
                    .then(function(result){
                        return result.data;
                    });
    }

    function get(id){
        var url = `api/persons?id=${id}`
        return $http.get(url)
                    .then(function(result){
                        return result.data.length > 0 ? result.data[0] : null;
                    });
    }

    return {
        fetch: fetch,
        get: get
    }
}])
angular.module('ratel')
.component('about',{
    templateUrl: 'app/views/about.html',
    controller: function($scope){
        const ctrl = this;
        
    }
})
angular.module('ratel')
.component('home',{
    bindings: {
        links: '='
    },
    templateUrl: 'app/views/home.html',
    controller: function($scope){
        var ctrl = this

        ctrl.$onInit = function(){
            init();
        }

        var clockDiv = $("#clock"),
            timeDiv = $("#time"),
            dayDiv = $("#day"),
            dateDiv = $("#date"),
            spacerDiv = $("#spacer"),
            secondDiv = $("#second"),
            secondsDiv = $("#seconds"),
            tickDiv = $("#tick");
    
        function drawclock(){
            var datetime = moment();
    
            var time = datetime.format("h:mm a").toLowerCase();
            timeDiv.text(time);

            var day = datetime.format("dddd");
            dayDiv.text(day);

            var date = datetime.format("MMMM Do, YYYY");
            dateDiv.text(date);

            var width = clockDiv.width();
            var second = datetime.format("s");

            var secondWidth = Math.floor(width / 60);
            var spacer = second * secondWidth;

            spacerDiv.width(spacer + "px");
            tickDiv.width(secondWidth * 2);
            tickDiv.height(secondWidth * 2);
            secondsDiv.height(secondWidth);
        }

        function resize() {
            var options = { max: 200 };
            timeDiv.quickfit(options);
            dayDiv.quickfit(options);
            dateDiv.quickfit(options);
        };

        function bindEvents() {
            setInterval(drawclock, 500);
            $(window).on('resize', resize);
        };
    
        function init() {
            bindEvents();
            setTimeout(function () {
                resize();
            }, 500);
        };
    }
})

angular.module('ratel')
.component('login',{
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/login.html',
    controller: function($scope){
        const ctrl = this;

    }
})
angular.module('ratel')
.component('menu',{
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/menu.html',
    controller: function($scope,MenuService){
        const ctrl = this;

        MenuService.fetch()
            .then(function(menus){
                ctrl.menus = menus
            })
    }
})
angular.module('ratel')
.component('persons',{
    templateUrl: 'app/views/persons.html',
    controller: function($scope,PersonService){
        const ctrl = this;
        
        ctrl.queries = []

        function createQuery(){
            return {
                field: '',
                operator: '',
                value: ''
            }
        }

        ctrl.addQuery = function(){
            ctrl.queries.push(createQuery());
        }

        ctrl.deleteQuery = function(index){
            ctrl.queries.splice(index,1);
        }


        ctrl.$onInit = function(){

            ctrl.addQuery();

            PersonService.get(0)
            .then(function(person){
                if(person){
                    ctrl.fields = Object.keys(person);
                }
            })  
        }
        
        ctrl.querytopstyle = function(){
            var top = 5 + (40 * ctrl.queries.length)
            return {'top' : top + 'px'}
        }
        
        function query(){
            PersonService.fetch(ctrl.queries)
            .then(function(people){
                ctrl.people = people;
            })                
        }

        $scope.$watch('$ctrl.queries',query,true)
    }
})
//# sourceMappingURL=../maps/app.js.map
