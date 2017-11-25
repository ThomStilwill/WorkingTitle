angular.module('ratel', ['ui.router'])
.controller('basecontroller',['$scope',function($scope){
    $scope.title='Ratel';
}]);

angular.module('ratel')
.component('persons',{
    templateUrl: 'app/persons.html',
    controller: function($scope,PersonService){
        const ctrl = this;
        
        function query(){
            if(ctrl.field && ctrl.operator && ctrl.query){
                PersonService.fetch(ctrl.field,ctrl.operator,ctrl.query)
                .then(function(people){
                    ctrl.people = people;
                })                
            }
        }

        $scope.$watch('$ctrl.field',query)
        $scope.$watch('$ctrl.operator',query)
        $scope.$watch('$ctrl.query',query)
    }
})
angular.module('ratel')
.service('PersonService', ['$q','$http', function($q,$http){

    function fetch(field,operator,value){

        var url = `api/persons?${field}${operator}${value}`

        return $http.get(url)
                    .then(function(result){
                        return result.data;
                    });
    }

    return {
        fetch:fetch
    }
}])
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

