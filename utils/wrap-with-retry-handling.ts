export const withRetryHandling = (
  callback: (...args: any[]) => void,
  { baseDelay = 400, logger = console, numberOfTries = 3 } = {},
) =>
  function callbackWithRetryHandling(...params: any[]) {
    const retry = async (attempt = 1): Promise<void> => {
      try {
        return await callback(...params);
      } catch (error) {
        if (attempt >= numberOfTries) throw error;

        // Use an increasing delay to prevent flodding the
        // server with requests in case of a short downtime.
        const delay = baseDelay * attempt;

        if (logger) logger.warn('Retry because of', error);

        return new Promise((resolve) =>
          setTimeout(() => resolve(retry(attempt + 1)), delay),
        );
      }
    };

    return retry();
  };
