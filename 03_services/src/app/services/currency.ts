import { Service } from '@angular/core';

@Service()
export class Currency {
    private USD = 44.80;
    private EUR = 51.86;

    public UsdToUah(value: number) {
        return value * this.USD;
    }

    public EURToUah(value: number) {
        return value * this.EUR;
    }

    public UahToUsd(value: number) {
        return value / this.USD;
    }

    public UahToEur(value: number) {
        return value / this.EUR;
    }
}
