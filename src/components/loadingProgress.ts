export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 55) {
      const rand = Math.round(Math.random() * 6) + 1;
      percent = Math.min(65, percent + rand);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = Math.min(92, percent + Math.round(Math.random() * 2));
        setLoading(percent);
        if (percent >= 92) {
          clearInterval(interval);
        }
      }, 1200);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(100, percent + 2);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 12);
    });
  }

  return { loaded, percent, clear };
};
