// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastCall: number, lastCallTimer: any;
// eslint-disable-next-line @typescript-eslint/ban-types
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
