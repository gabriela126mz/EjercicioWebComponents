export class TimerPartComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                .time-part {
                    color: var(--neutral-color);
                    padding: 10px;
                    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.2);
                    border-radius: 5px;
                    margin: 10px;
                }
                .tiempo {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                }
            </style>
            <div class="tiempo">
                <span class="time-part"></span>
            </div>
        `;
        this.segundos = Number(this.getAttribute('start'));
        this.interval = null;
        this.updateTime();
    }

    startTime() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.segundos--;
                if (this.segundos <= 0) {
                    clearInterval(this.interval);
                    this.dispatchEvent(new CustomEvent('endTime', { bubbles: true })); 
                }
                this.updateTime();
            }, 1000);
        }
    }

    pauseTime() {
        clearInterval(this.interval);
        this.interval = null;
    }

    resetTime() {
        this.pauseTime();
        this.segundos = Number(this.getAttribute('start'));
        this.updateTime();
    }

    updateTime() {
        const horas = ('0' + Math.floor(this.segundos / 3600)).slice(-2);
        const minutos = ('0' + Math.floor((this.segundos % 3600) / 60)).slice(-2);
        const segundos = ('0' + (this.segundos % 60)).slice(-2);
        this.shadowRoot.querySelector('.time-part').textContent = `${horas} : ${minutos} : ${segundos}`;
    }
}

customElements.define('timer-part-component', TimerPartComponent);
