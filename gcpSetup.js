// Imports
const fs = require('fs')

console.log('>>>>>>>', process.env.GCP_KEY_FILE, '<<<<<<<')
console.log('>>>>>>>', process.env.GCP_CRED, '<<<<<<<')

// Initializations
fs.writeFile(process.env.GCP_KEY_FILE, process.env.GCP_CRED, error => {
  console.error(error)
})
