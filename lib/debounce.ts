let lastCall: number, lastCallTimer: number;
export function debounce(callee: Function, timeoutMs: number) {
  return function perfrom(...args: unknown[]) {
    const prevCall = lastCall;
    lastCall = Date.now();
    if (prevCall && lastCall - prevCall <= timeoutMs) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}
