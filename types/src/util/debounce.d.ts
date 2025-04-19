export declare const debounce: (func: (...args: any[]) => any, delay: number) => {
    (...args: any[]): void;
    cancel(): void;
};
