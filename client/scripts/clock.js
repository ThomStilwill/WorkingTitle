var index = (function () {
    
        var clockDiv;
        var timeDiv;
        var dayDiv;
        var dateDiv;
    
        var spacerDiv;
        var secondDiv;
        var secondsDiv;
        var tickDiv;
    
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
    
        var resize = function () {
            var options = { max: 200 };
    
            timeDiv.quickfit(options);
            dayDiv.quickfit(options);
            dateDiv.quickfit(options);
        };
    
        var loadWeather = function() {
            //            <img src="http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_clean2day_cond&airportcode=KMMK&ForcedCity=Plainville&ForcedState=CT&zip=06062&language=EN" alt="Find more about Weather in Plainville, CT" width="300" />
    
            var img = $("<img />").attr('src', 'http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_clean2day_cond&airportcode=KMMK&ForcedCity=Plainville&ForcedState=CT&zip=06062&language=EN')
                .load(function() {
                    if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
                        alert('broken image!');
                    } else {
                        $("#weather>span>a").append(img);
                    }
                });
        };
    
        var init = function () {
    
            clockDiv = $("#clock");
            timeDiv = $("#time");
            dayDiv = $("#day");
            dateDiv = $("#date");
    
            spacerDiv = $("#spacer");
            secondDiv = $("#second");
            secondsDiv = $("#seconds");
            tickDiv = $("#tick");
    
            bindEvents();
            setTimeout(function () {
                resize();
            }, 500);
    
            //loadWeather();
        };
    
        return {
            init: init
        };
    
    }());
    
    $(function () {
        index.init();
    });
    