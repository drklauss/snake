var Game = {};
$.fn.snake = function (config) {
    (function (Game, $el) {
        Game.config = $.extend(config, {
            $el: $el
        });
        var scripts = ['move', 'bugs', 'snake', 'game'],
            counter = 0;

        scripts.forEach(function (v, i) {
            var x = document.createElement('script');
            x.src = 'script/' + v + '.js';
            document.getElementsByTagName("head")[0].appendChild(x);
            x.onload = function () {
                counter++;
                if (counter === scripts.length) {
                    Game.Start();
                }
            };
        })

    })(window.Game, this);
};