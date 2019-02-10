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

export const getAll = () => {
  return async (dispatch) => {
    console.log('Getting targets...')
    const newTargets = await targetService.getAll()

    console.log('reducerGetAll-----------------')
    console.log(newTargets)
    console.log('-----------------------------')

    dispatch({
      type: 'REPLACE_TARGETS',
      newTargets
    })
  }
}
