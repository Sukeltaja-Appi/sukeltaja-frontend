
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
