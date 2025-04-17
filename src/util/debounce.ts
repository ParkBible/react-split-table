export const debounce = (func: (...args: any[]) => any, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const debounced = (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };

    debounced.cancel = () => clearTimeout(timeoutId);
    return debounced;
};
