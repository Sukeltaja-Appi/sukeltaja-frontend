import diveService from '../services/dives'
import { standardQueuing } from '../utils/offlineThunkHandler'
import { userToID } from '../utils/userHandler'

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

export const ongoingDivesReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ONGOING_DIVE' :
      return [ ...state, action.dive ]
    case 'SET_ONGOING_DIVES':
      return action.dives
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

export const addOngoingDive = (dive) => {
  return {
    type: 'NEW_ONGOING_DIVE',
    dive
  }
}

export const setOngoingDives = (dives) => {
  return {
    type: 'SET_ONGOING_DIVES',
    dives
  }
}

export const startDives = (dives, userID) => {

  return async (dispatch) => {
    dives.forEach(async (dive) => {
      const newDive = await diveService.create(dive)

      if(dive.user === userID) {
        dispatch({
          type: 'NEW_DIVE',
          newDive
        })
      }
      dispatch(addOngoingDive(newDive))
    })
  }
}

export const endDives = (dives, userID) => {
  async function thunk (dispatch) {
    dives.forEach(async (dive) => {
      dive.enddate = new Date()
      const updatedDive = await diveService.update(dive._id, dive)

      if(userToID(dive.user) === userID) {
        dispatch({
          type: 'UPDATE_DIVE',
          updatedDive
        })
      }
    })
    dispatch(setOngoingDives([]))
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
