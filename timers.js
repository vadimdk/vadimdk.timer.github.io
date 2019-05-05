//1 Таймер должен получать время обратного отсчёта в конструкторе
//2 Должен иметь кнопки старт(запускает) и стоп(ставит паузу).
//3 Должен иметь в конструторе параметр для автоматического запуска(true/false). См на видео пример. 1ый таймер по кнопке запускается, а 2ой автоматически
//4 Длина полоски уменьшается с движением таймера(анимацию советую делать потом отдельно, она в этом задании НЕОБЯЗАТЕЛЬНА)
//Дополнительно: добавьте параметр в конструктор, который позволит передать интервал обновления таймера. Например раз в 1 секунду/100 мс/2с/10с. Обратите внимание на видео – нижний таймер меняется каждые 2 секунды.





const container = document.querySelector("#timers-container");



  

class Timer {
    constructor(minutes, step, autoRun = false) {
        this.step = step;
        this.secondsRem = minutes * 60;
        this.restart = minutes * 60;
        this.autoRun = autoRun;
        this.counting = false;
        this.buttonHandler = this.buttonHandler.bind(this);
        this.render();
        if (autoRun == true) {
            this.button.innerText = "Stop";
            this.continueInterval();

        }
    }

    createLine() {
        this.line = document.createElement("div");
        this.line.classList.add("line");
        return this.line;
    }


    //метод класса отрисовывает блок для таймера 
    createTimer() {
        this.timeDisplay = document.createElement("div");

        this.timeDisplay.classList.add("timecounter");
        return this.timeDisplay;
    }


    tick() {

        this.interval = setInterval(() => {

            let min = Math.floor(this.secondsRem / 60);

            let sec = this.secondsRem - (min * 60);

            if (sec < 10) {
                sec = "0" + sec;
            }
            let time = min + ":" + sec;

            this.timeDisplay.innerHTML = time;

            if (this.secondsRem === 0) {
                clearInterval(this.interval);
                this.secondsRem = this.restart;
                this.buttonHandler();

                clearInterval(this.lineinterval);
                this.createLine();

            }
            this.secondsRem -= (this.step / 1000);

        }, this.step);

    }



    createButton() {
        this.button = document.createElement("button");
        this.button.classList.add("btn");
        this.button.innerText = "Start";
        this.button.addEventListener("click", this.buttonHandler.bind(this));
        return this.button;
    }

    buttonHandler() {
        if (this.counting) {
            this.pauseInterval();
            this.pauseLineInterval();
            this.button.innerText = "Start";

        } else {
            this.continueInterval();
            this.continueLineInterval();
            this.button.innerText = "Stop";

        }
    }



    continueInterval() {
        this.counting = true;
        this.tick();

    }

    pauseInterval() {
        this.counting = false;
        clearInterval(this.interval);
        this.interval = null;

    }



    lifeInterval() {
        this.lineinterval = setInterval(() => {
            const currentWidth = this.line.offsetWidth;
            const percent = (this.width / this.restart);
            if (currentWidth - percent < 0) {

                return this.line.style.width = `${this.restart * 12}px`;
            }
            this.line.style.width = `${currentWidth - percent}px`;

        }, this.step);

    }

    continueLineInterval() {
        this.counting = true;
        this.lifeInterval();
    }

    pauseLineInterval() {
        this.counting = false;

        clearInterval(this.lineinterval);

    }

    render() {
        this.timerblock = document.createElement("div");
        this.timerblock.classList.add("timerblock");

        this.timerblock.append(this.createTimer());
        this.timerblock.append(this.createButton());
        this.timerblock.append(this.createLine());
        container.append(this.timerblock);

        this.width = this.line.offsetWidth;
        this.lifeInterval();


    }

}

new Timer(1, 1000, true);
new Timer(3, 2000, true);
