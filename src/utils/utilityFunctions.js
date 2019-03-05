
export const objectToID = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj._id !== 'undefined' ) return obj._id
    if ( typeof obj.id !== 'undefined' ) return obj.id
    if ( typeof obj.user !== 'undefined') return obj.user
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
