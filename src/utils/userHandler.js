
export const userToID = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj.id !== 'undefined' ) return obj.id
    if ( typeof obj.user !== 'undefined' ) {
      if ( typeof obj.user._id !== 'undefined' ) return obj.user._id
      if ( typeof obj.user.id !== 'undefined' ) return obj.user.id

      return obj.user
    }
    if ( typeof obj._id !== 'undefined' ) return obj._id
  }

  return obj
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

  let id1 = userToID(user1)
  let id2 = userToID(user1)

  return id1 === id2
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
