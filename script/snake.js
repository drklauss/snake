(function (Game) {
    Game.Snake = {
        instanse: $('.snake-abcp'),
        throughMyself: false,
        /**
         * Создание экземпляра змейки
         */
        Create: function () {
            return this;
        },
        /**
         * Сеттер ф-ии, которая будет вызвана при поедании
         * @param function func 
         */
        SetOnEat: function (func) {
            this.onEat = func;
            return this;
        },
        /**
         * Сеттер флага прохождения сквозь саму себя
         * @param function func 
         */
        SetThroughMyself: function (b) {
            this.throughMyself = b;
            return this;
        },
        /**
         * Сеттер начальных координат змейки
         * @param array coord 
         */
        SetCoord: function (coord) {
            this.coordinates = coord;
            return this;
        },
        /**
         * Сеттер ф-ии, которая будет вызвана при столкновении
         */
        SetOnCrash: function (func) {
            this.onCrash = func;
            return this;
        },
        /**
         * Инициализация
         */
        Init: function () {
            this.blinking();
        },
        /**
         * Возвращает координаты змейки
         */
        GetCoord: function () {
            return this.coordinates;
        },
        /**
         * Шагает
         */
        Stepping: function () {
            var newCoord = Game.Move.Handle(this.coordinates),
                tail = this.coordinates[this.coordinates.length - 1];
            this.checkForCollisions(newCoord);
            $('#s' + tail).html('');
            if (this.isBug) { // если жук, то добавляем хвост в координаты
                newCoord.push(tail);
            }
            for (var i = 0; i < newCoord.length; i++) {
                $('#s' + newCoord[i]).html(this.instanse.clone());
                if (i === 0) {
                    $('#s' + newCoord[i]).find('.snake-abcp').addClass('head');
                }
            }

            this.coordinates = newCoord;
        },
        /**
         * Проверка на столкновения
         * @param array newCoord  
         */
        checkForCollisions: function (newCoord) {
            this.isBug = false;
            if (newCoord[0] === -1) { // все, приехали
                this.onCrash();
                return false;
            }
            var $head = $('#s' + newCoord[0]),
                $obj = $head.find('.object');
            switch ($obj.data('collision')) {
                case 'snake':
                    if (this.throughMyself) {
                        return false;
                    }
                    this.onCrash();
                    break;
                case 'bug':
                    this.onEat($obj.data('type'), newCoord);
                    this.isBug = true;
                    break;
                default:
            }
        },
        /**
         * Мерцания головы
         */
        blinking: function () {
            setInterval(function () {
                $('.head').toggleClass('hidden');
                console.log('blink');
            }, 100);
        }
    };
})(window.Game);