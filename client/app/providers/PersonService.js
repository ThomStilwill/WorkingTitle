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