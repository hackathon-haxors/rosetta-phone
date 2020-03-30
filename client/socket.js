// Imports
import io from 'socket.io-client'

// Initializations
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

// Exports
export default socket
