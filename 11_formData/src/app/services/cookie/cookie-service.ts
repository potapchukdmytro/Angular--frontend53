import { Service } from '@angular/core';

@Service()
export class CookieService {
    public setUnix(key: string, value: string, time: number) {
        document.cookie = `${key}=${value}; path=/; expires=${new Date(time * 1000).toUTCString()};`;
    }

    public setDate(key: string, value: string, expires: Date) {
        document.cookie = `${key}=${value}; path=/; expires=${expires.toUTCString()};`;
    }

    public set(key: string, value: string) {
        document.cookie = `${key}=${value}; path=/;`;
    }

    public get(key: string): string | null {
        const params = document.cookie.split("; ");
        for(const p of params) {
            const item = p.split("=");
            if(item[0] == key) {
                return item[1];
            }
        }

        return null;
    }

    public remove(key: string) {
        document.cookie = `${key}=; expires=${new Date(0).toUTCString()};`;
    }
}
