
// returns the event id or null if no id was found.
export const eventToID = (event) => {
  if(typeof event === 'string') return event
  if ( typeof event !== 'undefined' ) {
    if ( typeof event.id !== 'undefined' ) return event.id
    if ( typeof event._id !== 'undefined' ) return event._id
  }

  return null
}

export const eventTitleOrID = (obj) => {
  if ( typeof obj !== 'undefined' ) {
    if ( typeof obj.title !== 'undefined' ) return obj.title
    if ( typeof obj.id !== 'undefined' ) return obj.id
    if ( typeof obj._id !== 'undefined' ) return obj._id
  }

  return obj
}
