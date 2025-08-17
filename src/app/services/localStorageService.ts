import { Injectable } from "@angular/core";
import { ConfigService } from "./interfaces/configService";

@Injectable({ providedIn: 'root' })
export class LocalConfigService implements ConfigService {
    get<T>(key: string): T | undefined {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }

    getWithObject<T1, T2>(key: T1): T2 | undefined {
        const value = localStorage.getItem(JSON.stringify(key));
        return value ? JSON.parse(value) : undefined;
    }

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    setWithObject<T1, T2>(key: T1, value: T2): void {
        localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }

    deleteWithObject<T>(key: T): void {
        localStorage.removeItem(JSON.stringify(key));
    }
}
