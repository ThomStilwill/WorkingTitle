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