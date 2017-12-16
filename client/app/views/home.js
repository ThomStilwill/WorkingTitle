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
    
        var bindEvents = function () {
    
            setInterval(function () {
    
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
    
            }, 500);
    
            $(window).on('resize', function () {
                resize();
            });
    
        };
    
        function resize() {
            var options = { max: 200 };
    
            timeDiv.quickfit(options);
            dayDiv.quickfit(options);
            dateDiv.quickfit(options);
        };
    
    
        function init() {
    
            bindEvents();
            setTimeout(function () {
                resize();
            }, 500);

        };


    }
})
