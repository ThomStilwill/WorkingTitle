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
