angular.module('ratel')
    .component('tags', {
        templateUrl: 'app/views/tags.html',
        controller: function ($scope, LinkService) {
            const ctrl = this;

            var tagContainer;
            var canvas;
            var canvasCtx;


            var resetCanvas = function () {
                canvasCtx.canvas.width = tagContainer.width();
                canvasCtx.canvas.height = tagContainer.height();
                var options = {
                    textColour: null,
                    outlineColour: '#C3C3C3',
                    outlineMethod: 'classic',
                    outlineThickness: 1,
                    outlineOffset: 4,
                    textHeight: 36,
                    textFont: 'Century Gothic',
                    depth: 0.99,
                    maxSpeed: 0.09,
                    minSpeed: 0.0,
                    minBrightness: 0.3,
                    reverse: true,
                    frontSelect: true,
                    shuffleTags: true,
                    initial: [0.09, 0.05],
                    weight: true,
                    weightFrom: 'weight',
                    weightMode: 'size',
                    weightSizeMin: 14,
                    weightSizeMax: 24,
                    imageMode: "both",
                };

                if (!canvas.tagcanvas(options, 'tags')) {
                    // something went wrong, hide the canvas container
                    tagContainer.hide();
                }
            };

            var registerEvents = function () {
                window.onresize = function () {
                    resetCanvas();
                };
            };

            var addLink = function (title, href, color, src, weight) {
                if (!color) {
                    color = '#bbb';
                }
                if (!weight) {
                    weight = 1;
                }

                var a = $(document.createElement('a'))
                    .attr('href', "http://" + href)
                    .attr('weight', weight)
                    .css('color', color);

                a.append(title);

                if (src) {
                    a.append('<img src="data:image/x-icon;base64,' + src + '"></img>');
                }

                $('#tags').append(a);
            };

            var load = function (tags) {
                $.each(tags.groups, function () {
                    var group = this;
                    var color = group.color;

                    $.each(group.tags, function () {
                        var tag = this;
                        var src = tag.src || null;

                        if (tag.weight) {
                            addLink(tag.title, tag.url, color, src, tag.weight);
                        } else {
                            addLink(tag.title, tag.url, color, src);
                        }
                    });
                });
            };

            ctrl.$onInit = function(){
                tagContainer = $('#tag-container');
                canvas = $('#tag-canvas');
                canvasCtx = canvas[0].getContext('2d');

                LinkService.fetch()
                    .then(function (tags) {
                        $('#tags').empty();
                        load(tags);
                        resetCanvas();
                        registerEvents();
                    })
            }
        }
    })