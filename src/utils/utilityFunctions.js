
export const objectToID = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj._id !== 'undefined' ) return obj._id
    if ( typeof obj.id !== 'undefined' ) return obj.id
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
    if(userEqualsObject(user, users[i])) return true
  }
  return false
}
