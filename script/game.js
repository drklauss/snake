(function (Game) {
    Game = $.extend(Game, {
        score: 0,
        isPaused: false,
        speed: 0,
        bugsKilled: 0,
        /**
         * Запуск игры
         */
        Start: function () {
            this.init();
            this.Run();
        },
        Run: function () {
            this.runner = setInterval(function () {
                if (!Game.isPaused) {
                    Game.Snake.Stepping();
                    Game.Bugs.Render();
                }
            }, Game.speed)
        },
        /**
         * Игровые клавиши
         */
        keyBundings: function () {
            $('#reset').on('click', function () {
                clearInterval(Game.runner);
                Game.Run();
            })
            $('#pause').on('click', function () {
                var $btn = $(this);
                $btn.toggleClass('active');
                Game.isPaused = $btn.hasClass('active');
            })
            $(document).on('keydown', function (e) {
                if (e.keyCode === 32) {
                    Game.isPaused = !Game.isPaused;
                    Game.isPaused ? $('#pause').addClass('active') : $('#pause').removeClass('active');
                }
            });
        },
        /**
         * Инициализация
         */
        init: function () {
            this.score = 0;
            this.isPaused = false;
            Game.speed = Game.config.upInterval;
            this.genWorld();
            Game.Move.Init(this.config.rows, this.config.cols, this.config.throughWalls);
            Game.Bugs.Init(this.config.rows * this.config.cols);
            Game.Snake.
                Create().
                SetThroughMyself(this.config.throughMyself).
                SetOnEat(this.onEat).
                SetOnCrash(this.onCrash).
                SetCoord(this.genSnakeCoordinates()).
                Init();
            this.keyBundings();
        },
        /**
         * Действие при поедании
         * @param jQuery $head 
         */
        onEat: function (bugType) {
            switch (bugType) {
                case Game.Bugs.Types.SMALL:
                    Game.score += 2;
                    break;
                case Game.Bugs.Types.BIG:
                    Game.score += 5;
                    $('#progress').hide();
                    break;
            }
            Game.bugsKilled++;
            $('#score>span').text(Game.score);
            $('#bugs>span').text(Game.bugsKilled);
            if (Game.bugsKilled % 10 === 0) {
                clearInterval(Game.runner);
                Game.speed -= Game.config.speedStep;
                currentSpeed = (Game.config.upInterval - Game.speed) / Game.config.speedStep + 1;
                $('#speed>span').text(currentSpeed);

                Game.Run();
            }
        },
        /**
         * Действие при столкновении
         */
        onCrash: function () {
            clearInterval(Game.runner);
            alert('Game Over, dude!');
        },
        /**
         * Создает игрвое поле
         */
        genWorld: function () {
            var land = '<table class="snake-table ordered">';
            for (var r = 0; r < this.config.rows; r++) {
                land += '<tr>';
                for (var c = 0; c < this.config.cols; c++) {
                    var col = r * this.config.cols + c;
                    land += '<td id="s' + col + '" class="cell"></td>';
                }
                land += '</tr>';
            }
            land += '</table>';
            this.config.$el.append(land);
        },
        /**
         * Генерирует начальные координаты змейки
         */
        genSnakeCoordinates: function () {
            var coord = [],
                firstCoord = Math.round(this.config.rows / 2) * Math.round(this.config.cols / 2),
                second = firstCoord + 1,
                third = second + 1;
            coord.push(firstCoord, second, third);
            return coord;
        }
    });
})(window.Game);