export * from './date-fns'
export * from './http'

export function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
