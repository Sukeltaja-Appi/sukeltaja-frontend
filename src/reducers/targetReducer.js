import targetService from '../services/targets'

export const targetReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TARGETS':
      return action.targets
    default:
      return state
  }
}

export const getAll = () => {

  async function thunk (dispatch) {
    const targets = await targetService.getAll()

    dispatch({
      type: 'INIT_TARGETS',
      targets
    })
  }

  thunk.interceptInOffline = true
  thunk.meta = { retry: true }

  return thunk
}
