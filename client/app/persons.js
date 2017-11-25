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