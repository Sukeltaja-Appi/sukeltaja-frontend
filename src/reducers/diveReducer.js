import diveService from '../services/dives'
import { standardQueuing } from '../utils/offlineThunkHandler'

export const diveReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_DIVE': {
      return [ ...state, action.newDive ]
    }
    case 'UPDATE_DIVE': {
      const id = action.updatedDive._id

      return state.map(dive => dive._id !== id ? dive : action.updatedDive)
    }
    case 'INIT_DIVES':
      return action.dives
    default:
      return state
  }
}

export const ongoingDiveReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ONGOING_DIVE': {
      return action.ongoingDive
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

    dispatch(setOngoingDive(newDive))
  }
}

export const endDive = (dive) => {

  async function thunk (dispatch) {
    const updatedDive = await diveService.update(dive._id, dive)

    dispatch({
      type: 'UPDATE_DIVE',
      updatedDive
    })

    dispatch(setOngoingDive(null))
  }

  return standardQueuing(thunk)
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
    const updatedDive = await diveService.update(dive._id, dive)

    dispatch({
      type: 'UPDATE_DIVE',
      updatedDive
    })
  }
}

export const setOngoingDive = (dive) => {
  return {
    type: 'SET_ONGOING_DIVE',
    ongoingDive: dive
  }
}
