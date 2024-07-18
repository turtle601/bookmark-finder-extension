// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export default debounce;
