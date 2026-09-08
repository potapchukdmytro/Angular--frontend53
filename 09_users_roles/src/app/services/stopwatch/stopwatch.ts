import { Service, signal } from '@angular/core';

@Service()
export class Stopwatch {
    private interval$: number | null = null;
    private milliseconds = 0;

    public time = signal('00:00:00');
    public isRunnig = signal(false);

    public start(): void {
        this.isRunnig.set(true);
        if(!this.interval$) {
            this.interval$ = setInterval(() => {
                this.milliseconds++;
                this.updateTime();
            }, 10);
        }
    }

    public stop() {
        this.isRunnig.set(false);
        if(this.interval$) {
            clearInterval(this.interval$);
            this.interval$ = null;
        }
    }

    public reset() {
        this.stop();
        this.milliseconds = 0;
        this.updateTime();
    }

    private updateTime() {
        // 6555  01:05:55

        const min = Math.floor(this.milliseconds / 100 / 60);
        const sec = Math.floor(this.milliseconds / 100) % 60;
        const msec = this.milliseconds % 100;

        const result = `${this.pad(min)}:${this.pad(sec)}:${this.pad(msec)}`;
        this.time.set(result);
    }

    private pad(value: number) {
        return value >= 10 ? value.toString() : '0' + value.toString();
    }
}
