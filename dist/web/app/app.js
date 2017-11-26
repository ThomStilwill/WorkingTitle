angular.module('ratel', ['ui.router'])
.controller('basecontroller',['$scope',function($scope){
    $scope.title='Ratel';
    $scope.version = '0.0.1'
    $scope.year = (new Date()).getFullYear();
}]);

angular.module('ratel')
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {

   $urlRouterProvider.otherwise('/');
   $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
   
   var states = [
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
    $trace.enable('TRANSITION');

    $state.defaultErrorHandler(function() {
        console.log('Default error handler fired!');
    });

    $transitions.onStart({}, function(transition) {
        console.log('Starting transition!');
        transition.promise.finally(console.log('Transition promise finally fired!'));
    });
    $transitions.onError({}, function(transition) {
        console.log('Transition erred!');
    });

    $state.go('persons')
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

        function query(){
            PersonService.fetch(ctrl.queries)
            .then(function(people){
                ctrl.people = people;
            })                
        }

        $scope.$watch('$ctrl.queries',query,true)
    }
})