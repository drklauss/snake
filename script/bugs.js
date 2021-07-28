(function (Game) {
    Game.Bugs = {
        smallBugsKilled: 0,
        bugs: $('.snake-bug'),
        Types: {
            SMALL: 1,
            BIG: 2,
        },
        Init: function (num) {
            Game.Bugs.resolution = num;
        },
        /**
         * Создание жучка 
         */
        Render: function () {
            if (!this.canDrawBugs()) {
                return false;
            }
            this.smallBugsKilled++;
            if (this.smallBugsKilled % 5 === 0) {
                this.drawBigBug();
            }
            this.drawSmallBug();
        },
        /**
         * Можно ил рисовать еще жуков
         */
        canDrawBugs: function () {
            var countSmall = 0;
            Game.Bugs.bugs.each(function () {
                if ($(this).data('type') === Game.Bugs.Types.SMALL &&
                    $(this).data('collision') === 'bug') {
                    countSmall += 1;
                }
            })
            return countSmall < 1;
        },
        /**
         * Рисует большого жука
         */
        drawBigBug: function () {
            var w = 100,
                $progress = $('#progress');
            $progressBar = $progress.find('.progress-bar');
            $progressBar.width('100%');
            $progress.show();
            var interval = setInterval(function () {
                if (!Game.isPaused) {
                    w -= 1;
                    $progressBar.width(w + '%');
                    $('.snake-bug.big').fadeOut().fadeIn();
                    if (w === 0) {
                        clearInterval(interval);
                        $('.snake-bug.big').fadeOut().remove();
                        $progress.hide();
                    }
                }
            }, 100)
            var bugId = Math.round(Math.random() * Game.Bugs.bugs.length - 1),
                $bugDiv = $(Game.Bugs.bugs[bugId]);
            $bugDiv.addClass('big').data('type', this.Types.BIG).height(22).width(22);
            var loc =this.calcBugLocation();                 
            $('#s' + loc).html($bugDiv);
            // console.log('big: '+loc);
            $bugDiv.fadeIn();
        },
        /**
         * Рисует маленького жука
         */
        drawSmallBug: function () {
            var bugId = Math.round(Math.random() * Game.Bugs.bugs.length - 1),
                $bugDiv = $(Game.Bugs.bugs[bugId]);
            $bugDiv.data('type', this.Types.SMALL).height(18).width(18);
            var loc =this.calcBugLocation();                 
            $('#s' + loc).html($bugDiv);
            $bugDiv.fadeIn();
        },
        /**
         * Высчитывает точку отрисовки жука
         */
        calcBugLocation: function () {
            var snakeCoord = Game.Snake.GetCoord();
            var possibleBugLocation = [];
            for (var i = 0; i <= this.resolution; i++) {
                if (snakeCoord.indexOf(i) !== -1) { // исключаем координаты змейки
                    continue;
                }
                possibleBugLocation.push(i);
            }
            var index = Math.round(Math.random() * possibleBugLocation.length);
            
            return possibleBugLocation[index];
        }
    }
})(window.Game);