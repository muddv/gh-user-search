export function debounce(callee: Function, timeoutMs: number) {
  return function perfrom(...args: any) {
    let lastCall, lastCallTimer
    let prevCall = lastCall
    lastCall = Date.now()
    if (prevCall && lastCall - prevCall <= timeoutMs) {
     clearTimeout(lastCallTimer) 
    }
    lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}
