import targetService from '../services/targets'

export const targetReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TARGET':
      return [ ...state, action.newTarget ]
    case 'ADD_TARGETS':
      return [ ...state, ...action.newTargets ]
    case 'REPLACE_TARGETS':
      return action.newTargets
    default:
      return state
  }
}

export const getAllTest = () => {
  return (dispatch) => {
    const newTargets = targetService.getAllTest()

    dispatch({
      type: 'REPLACE_TARGETS',
      newTargets
    })
  }
}

export const initializeTargets = () => {}
