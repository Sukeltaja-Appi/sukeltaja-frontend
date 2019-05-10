
export const standardQueuing = (thunk) => {
  thunk.interceptInOffline = true
  thunk.meta = { retry: true }

  return thunk
}
