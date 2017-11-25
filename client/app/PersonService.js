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