export interface ConfigService {

    get<T>(key: string): T | undefined;
    getWithObject<T1, T2>(key: T1): T2 | undefined;
    set<T>(key: string, value: T): void;
    setWithObject<T1, T2>(key: T1, value: T2): void;
    delete(key: string): void;
    deleteWithObject<T1>(key: T1): void;
}
