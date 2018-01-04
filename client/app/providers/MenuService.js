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