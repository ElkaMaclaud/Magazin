export function debounce(callback: (args: any) => any, duration: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: any) => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback.apply(null, args);
        }, duration)
    }
} 

  