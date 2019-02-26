import targetService from '../services/targets'

export const targetReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TARGET':
      return [ ...state, action.newTarget ]
    case 'ADD_TARGETS':
      return [ ...state, ...action.newTargets ]
    case 'SET_TARGETS':
      return action.newTargets
    default:
      return state
  }
}

export const selectedTargetReducer = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_TARGET':
      return [ ...state, action.target ]
    case 'SELECT_TARGETS':
      return [ ...state, ...action.targets ]
    case 'SET_SELECTED_TARGETS':
      return action.targets
    default:
      return state
  }
}

export const getAll = () => {
  return async (dispatch) => {
    console.log('Getting targets...')
    const newTargets = await targetService.getAll()

    dispatch({
      type: 'SET_TARGETS',
      newTargets
    })
  }
}

export const selectTarget = (target) => {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_TARGET',
      target
    })
  }
}

export const setSelectedTargets = (targets) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SELECTED_TARGETS',
      targets: targets
    })
  }
}

export const resetTargets = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SELECTED_TARGETS',
      targets: []
    })
  }
}
