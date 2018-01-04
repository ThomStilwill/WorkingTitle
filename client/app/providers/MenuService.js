angular.module('ratel')
.service('MenuService', ['$q','$http','$log', function($q,$http,$log){

    function fetch(id){
        var url = `api/persons?id=${id}`
        return $http.get(url)
                    .then(function(result){
                        return result.data.length > 0 ? result.data[0] : null;
                    });
    }

    return {
        fetch: fetch
    }
}])