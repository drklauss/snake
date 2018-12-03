(function (Game) {
    Game.Move = {
        TOP: 'top',
        BOTTOM: 'bottom',
        RIGHT: 'right',
        LEFT: 'left',
        direction: 'top',
        throughWalls: true,
        rows: 0,
        cols: 0,
        resolution: 0,
        /**
         * Инициализаия модуля движений движений
         */
        Init: function (rows, cols, throughWalls) {
            this.rows = rows;
            this.cols = cols;
            this.throughWalls = throughWalls;
            this.resolution = this.rows * this.cols;
            this.keyBindings();
        },
        /**
         * Управление
         */
        keyBindings: function () {
            $(document).on('keydown', function (e) {
                switch (e.keyCode) {
                    case 37:
                        Game.Move.direction = Game.Move.LEFT;
                        break;
                    case 38:
                        Game.Move.direction = Game.Move.TOP;
                        break;
                    case 39:
                        Game.Move.direction = Game.Move.RIGHT;
                        break;
                    case 40:
                        Game.Move.direction = Game.Move.BOTTOM;
                        break;
                }
            });
        },
        /**
         * Обработчик движений
         * @param arrat coord 
         */
        Handle: function (coord) {
            var next = this.getNextCoord(coord[0]),
                coordinates = [];
            coordinates.push(next);
            for (var i = 0; i < coord.length - 1; i++) {
                coordinates.push(coord[i]);
            }
            return coordinates;
        },
        /**
         * Возвращает следующую координату по направлению движения
         * Если выход за пределы поля запрещен, а он происходит, возвращается -1
         * @param int id
         * @return int 
         */
        getNextCoord: function (prev) {
            var diff = 0;
            switch (this.direction) {
                case this.TOP:
                    diff = prev - this.cols;
                    if (diff < 0) { // уходит вверх
                        if (this.throughWalls) {
                            return this.resolution - (this.cols - prev);
                        }
                        return -1;
                    }
                    return diff;
                case this.BOTTOM:
                    diff = prev + this.cols;
                    if (diff > this.resolution) { // уходит вниз
                        if (this.throughWalls) {
                            return prev % this.cols;
                        }
                        return -1;
                    }
                    return diff;
                case this.RIGHT:
                    if ((prev % this.cols === this.cols - 1) && ((prev + 1) % this.cols === 0)) { // уходит вправо
                        if (this.throughWalls) {
                            return prev - this.cols + 1;
                        }
                        return -1;
                    }
                    return prev + 1;
                case this.LEFT:
                    if ((prev % this.cols === 0) && ((prev - 1) % this.cols === this.cols - 1)) { // уходит вправо
                        if (this.throughWalls) {
                            return prev + this.cols - 1;
                        }
                        return -1;
                    }
                    return prev - 1;
            }
        }
    };
})(window.Game);