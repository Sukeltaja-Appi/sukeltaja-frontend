import targetService from '../services/targets'

export const targetReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TARGETS':
      return action.targets
    default:
      return state
  }
}

export const currentTargetReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TARGET':
      return action.currentTarget
    default:
      return state
  }
}

export const setCurrentTarget = (target) => {
  return {
    type: 'SET_CURRENT_TARGET',
    currentTarget: target
  }
}

export const getAll = () => {
  return async (dispatch) => {
    const targets = await targetService.getAll()

    dispatch({
      type: 'INIT_TARGETS',
      targets
    })
  }
}

export const forgetTargets = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CURRENT_TARGET',
      target: null
    })
    dispatch({
      type: 'INIT_TARGETS',
      targets: []
    })
  }
}
