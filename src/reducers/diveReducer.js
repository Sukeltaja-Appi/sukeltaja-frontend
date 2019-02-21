import diveService from '../services/dives'

export const diveReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_DIVE': {
      return [ ...state, action.newDive ]
    }
    case 'UPDATE_DIVE': {
      const id = action.updatedDive.id

      return state.map(dive => dive.id !== id ? dive : action.updatedDive)
    }
    case 'INIT_DIVES':
      return action.dives
    default:
      return state
  }
}

export const ongoingDiveReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_DIVE': {
      return action.currentDive
    }
    default:
      return state
  }
}

export const initializeDives = () => {
  return async (dispatch) => {
    const dives = await diveService.getAll()

    dispatch({
      type: 'INIT_DIVES',
      dives
    })
  }
}

export const startDive = (dive) => {
  return async (dispatch) => {
    const newDive = await diveService.create(dive)

    dispatch({
      type: 'NEW_DIVE',
      newDive
    })
    dispatch({
      type: 'SET_CURRENT_DIVE',
      currentDive: newDive
    })
  }
}

export const endDive = (dive) => {
  return async (dispatch) => {
    const updatedDive = await diveService.update(dive.id, dive)

    dispatch({
      type: 'UPDATE_DIVE',
      updatedDive
    }),
    dispatch({
      type: 'SET_CURRENT_DIVE',
      currentDive: null
    })
  }
}

export const createDive = (dive) => {

  return async (dispatch) => {
    const newDive = await diveService.create(dive)

    dispatch({
      type: 'NEW_DIVE',
      newDive
    })

    return newDive
  }
}

export const updateDive = (dive) => {

  return async (dispatch) => {
    const updatedDive = await diveService.update(dive.id, dive)

    dispatch({
      type: 'UPDATE_DIVE',
      updatedDive
    })
  }
}

export const forgetDives = () => {
  return (dispatch) => {
    dispatch({
      type: 'INIT_DIVES',
      dives: []
    })
    dispatch({
      type: 'SET_CURRENT_DIVE',
      currentDive: []
    })
  }
}
