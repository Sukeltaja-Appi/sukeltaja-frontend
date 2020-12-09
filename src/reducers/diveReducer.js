import diveService from '../services/dives'
import { standardQueuing } from '../utils/offlineThunkHandler'
import { userToID } from '../utils/userHandler'

// Does not store anything yet, but could be used
// to list all users individual dives.
// Code commented to save space since users individual dives are not yet displayed
// independently of an event anywhere.
export const diveReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_DIVE':
      return state //Replace with below line to use this reducer
      //return [ ...state, action.newDive ]
    case 'UPDATE_DIVE': {
      const id = action.updatedDive._id

      return state.map(dive => dive._id !== id ? dive : action.updatedDive)
    }
    case 'DELETE_DIVE':
      return state.filter(d => d._id !== action.dive._id)
    case 'INIT_DIVES':
      return state //Replace with below line to use this reducer
      // return action.dives
    default:
      return state
  }
}

// Holds dives that user has started that are still ongoing.
// Can contain dives of other users aswell.
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

// Gets all users own dives.
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

// Posts one or mode dives. If one of the dives belongs
// to the app user it is saved to diveReducer.
// userID: logged in users id
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

// FIXME: This sets ongoing dives to [], but unless dives parameter includes all
// ongoing dives, some ongoing dives will stay ongoing and be removed from ongoingDives array
// Ends started dives. Updates users own dive, if one exists in parameter dives.
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

export const createDive = (dive, userID) => {
  async function thunk (dispatch) {
    const newDive = await diveService.create(dive)

    if (userID === newDive._id) {
      dispatch({
        type: 'NEW_DIVE',
        newDive
      })
    }
  }

  return standardQueuing(thunk)
}

export const updateDive = (dive, userID) => {
  async function thunk (dispatch) {
    const updatedDive = await diveService.update(dive._id, dive)

    if (userID === updatedDive._id) {
      dispatch({
        type: 'UPDATE_DIVE',
        updatedDive
      })
    }

    return updatedDive
  }

  return standardQueuing(thunk)
}

export const deleteDive = (dive, userID) => {
  async function thunk (dispatch) {
    await diveService.del(dive._id)

    if (userID === dive._id) {
      dispatch({
        type: 'DELETE_DIVE',
        dive
      })
    }
  }

  return standardQueuing(thunk)
}
