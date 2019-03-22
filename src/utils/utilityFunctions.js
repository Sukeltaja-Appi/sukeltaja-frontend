
// returns the message id or null if no id was found.
export const messageToID = (message) => {
  if(typeof message === 'string') return message
  if ( typeof message !== 'undefined' ) {
    if ( typeof message.id !== 'undefined' ) return message.id
    if ( typeof message._id !== 'undefined' ) return message._id
  }

  return null
}
