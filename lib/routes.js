'use strict';
console.log("Router script started");
var assign = require('lodash').assign;
var express = require('express');
var router = express.Router();
var fs = require('fs');
var graph = require('./graph');

console.log("routes.js initialized");


//var values = require('lodash').values;
var myImage = 'staticFiles/profile.jpg'

console.log(myImage);
var routes = function(cloudVisionClient)
{
    function getResponse(error, response)
    {
        if (error)
        {
            context.error = error;
            console.log("The error is :" + context.error);
        } else
        {
            // Indent 2 spaces the json response if exists.
            context.vision.prettyprint = response ?
                JSON.stringify(response, null, 2) : null;

            context.vision.response = JSON.stringify(response.responses);
            context.vision.labels =
                JSON.stringify(response.responses[0].labelAnnotations.map(function(value){return [value.score, value.description]; }));
            console.log("the response is " + context.vision.response);
            console.log("the response is " + context.vision.labels);
            //create Node in graph here
            //res.render('base', assign(context, defaultContext));

        }
    }
      var defaultContext =

          {featureTypes: cloudVisionClient.featureTypes
         };
          var context =
              {
            vision: {}
          };

        encodeImage(myImage, sendRequest);


        function encodeImage(myImage, callback)
        {
            fs.readFile(myImage, function(err, data) //data wird erst zugewiesen wenn fileupload beendet!
            {
                if (err)
                {
                    throw err;
                }
                var encoded = new Buffer(data).toString('base64');
                console.log("start" + encoded + "End");
                callback(encoded);
            })
        }

        function sendRequest(encodedImage)
        {
            if (encodedImage)
            {   //imagePath, featureType, maxResults, callback
                cloudVisionClient.detectImage
                (encodedImage, 0, 3, getResponse);
                //res.render('base', assign(context, defaultContext));
            } else
            {
                context.error = 'Something went wrong uploading the image!';
                //res.render('base', assign(context, defaultContext));
            }
        }




  return router;
};

module.exports = routes;
