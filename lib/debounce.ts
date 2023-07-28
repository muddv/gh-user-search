let lastCall: number, lastCallTimer: number
export function debounce(callee: Function, timeoutMs: number) {
  return function perfrom(...args: any) {
    let prevCall = lastCall
    lastCall = Date.now()
    if (prevCall && lastCall - prevCall <= timeoutMs) {
      console.log('here')
     clearTimeout(lastCallTimer) 
    }
    lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}
