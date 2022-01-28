function useDebounce<T extends Function>(fn: T, delay?: number) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay || 500);
  };
}

export default useDebounce;
