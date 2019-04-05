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
  return async (dispatch) => {
    const targets = await targetService.getAll()

    dispatch({
      type: 'INIT_TARGETS',
      targets,
      meta: {
        retry: true
      }
    })
  }
}
