/**
 * Created by marie on 25.05.2017.
 */
var express = require ('express');
var fs = require('fs');
var myImage = 'staticFiles/profile.jpg';

fs.readFileSync(myImage, function(err, data){
    if (err)
    {
        throw err;
    }
    resolve(data);
});
var encoded = new Buffer(data).toString('base64');
console.log("start" + encoded + "End");
encodedImage = encoded


function stats (file) {
    return new Promise((resolve, reject) => {
            fs.stat(file, (err, data) => {
            if (err) {
                return reject (err);
            }
            resolve(data);
        })
})
}

Promise.all([
    stats('file1'),
    stats('file2'),
    stats('file3')
])
    .then((data) => console.log(data))
.catch((err) => console.log(err))