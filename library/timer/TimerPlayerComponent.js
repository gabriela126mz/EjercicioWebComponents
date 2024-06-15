export class TimerPlayerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                button {
                    padding: 5px 30px;
                    margin: 5px 10px;
                    border-radius: 5px;
                    border: none;
                    background-color: var(--primary-lightest-color);
                    cursor: pointer;
                }
                .play {
                    background-color: var(--primary-color);
                    color: var(--primary-lightest-color);
                }
                .smsfinish {
                    font-size: 1.5rem;
                    text-align: center;
                    color: var(--info-color);
                    margin: 0 0 20px 0;
                    display: none;
                }
            </style>
            <h1 class="smsfinish">¡Ready!</h1>
            <slot name="timerplayer"></slot>
            <button class="pause">Pause</button>
            <button class="play">Play</button>
            <button class="reset">Reset</button>
        `;
    }

    connectedCallback() {
        const timerComponent = this.querySelector('timer-part-component');
        const smsfinish = this.shadowRoot.querySelector('.smsfinish');

        this.shadowRoot.querySelector('.play').addEventListener('click', () => timerComponent.startTime());
        this.shadowRoot.querySelector('.pause').addEventListener('click', () => timerComponent.pauseTime());
        this.shadowRoot.querySelector('.reset').addEventListener('click', () => {
            timerComponent.resetTime();
            smsfinish.style.display = 'none';
        });

        timerComponent.addEventListener('endTime', () => {
            smsfinish.style.display = 'block';
        });
       
    }
}
customElements.define('timer-player-component', TimerPlayerComponent);