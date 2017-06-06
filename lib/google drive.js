var googleDrive = require('google-drive')

// ...
// add stuff here which gets you a token, fileId, and callback
// ...

var token = 'abc123456'
    , fileId = 'def123456'

function getFile(token, fileId, callback) {
    googleDrive(token).files(fileId).get(callback)
}

function listFiles(token, callback) {
    googleDrive(token).files().get(callback)
}

function callback(err, response, body) {
    if (err) return console.log('err', err)
    console.log('response', response)
    console.log('body', JSON.parse(body))
}/**
 * Created by marie on 26.05.2017.
 */
