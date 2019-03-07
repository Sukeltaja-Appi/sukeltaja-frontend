
export const objectToID = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj.id !== 'undefined' ) return obj.id
    if ( typeof obj.user !== 'undefined') return obj.user
    if ( typeof obj._id !== 'undefined' ) return obj._id
  }

  return obj
}

// returns the event id or null if no id was found.
export const eventToID = (event) => {
  if(typeof event === 'string') return event
  if ( typeof event !== 'undefined' ) {
    if ( typeof event.id !== 'undefined' ) return event.id
    if ( typeof event._id !== 'undefined' ) return event._id
  }

  return null
}

// returns the message id or null if no id was found.
export const messageToID = (message) => {
  if(typeof message === 'string') return message
  if ( typeof message !== 'undefined' ) {
    if ( typeof message.id !== 'undefined' ) return message.id
    if ( typeof message._id !== 'undefined' ) return message._id
  }

  return null
}

export const usernameOrId = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj.username !== 'undefined' ) return obj.username
    if ( typeof obj.id !== 'undefined' ) return obj.id
    if ( typeof obj._id !== 'undefined' ) return obj._id
  }

  return obj
}

export const userObjEqualsUserObj = (user1, user2) => {
  if(typeof user1 === 'undefined' || typeof user2 === 'undefined') return false

  if ( typeof user1.username !== 'undefined'
    && typeof user2.username !== 'undefined' ) {
    return user1.username === user2.username
  }

  let id1 = objectToID(user1)
  let id2 = objectToID(user1)

  return id1 === id2
}

// Can compare standard user with user fields
// on other objects. comparison will work
// if obj is a user or userID
export const userEqualsObject = (user, obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj.username !== 'undefined' ) {
      return obj.username === user.username
    }
    if ( typeof obj.id !== 'undefined' ) {
      return obj.id === user.id
    }
    if ( typeof obj.user !== 'undefined' ) {
      return obj.user === user.id
    }
    if ( typeof obj._id !== 'undefined' ) {
      return obj._id === user.id
    }
  }

  return obj === user.id
}

// Cheks if user is in the array.
export const userIsInArray = (user, users) => {
  for(let i = 0; i < users.length; i++) {
    if(userObjEqualsUserObj(user, users[i])) return true
  }

  return false
}

export const mergeUserLists = (users1, users2) => {
  let newUsers = []

  for(let i = 0; i < users2.length; i++) {
    if(!userIsInArray(users2[i], users1)) newUsers.push(users2[i])
  }

  return users1.concat(newUsers)
}
