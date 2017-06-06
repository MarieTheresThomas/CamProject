/*
   Copyright 2016, Google, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

'use strict';

var unirest = require('unirest');
var invert = require('lodash').invert;
var fs = require('fs');

console.log("Cloud Vision initialized");
function VisionClient(config) {
  if (!(this instanceof VisionClient)) {
    return new VisionClient(config);
  }
 
  this.key = config.key;
  this.FEATURE_TYPES = VisionClient.FEATURE_TYPES;
};

VisionClient.GOOGLE_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

VisionClient.FEATURE_TYPES =[
  "LABEL_DETECTION",
  "TEXT_DETECTION",
  "FACE_DETECTION",
  "LANDMARK_DETECTION",
  "LOGO_DETECTION",
  "SAFE_SEARCH_DETECTION",
  "IMAGE_PROPERTIES"
]

VisionClient.prototype.featureTypes = VisionClient.FEATURE_TYPES;

VisionClient.prototype.encode64 = function(filePath, callback)
{
    fs.readFile(filePath, function(err, data){
        if (err)
        {
            throw err;
        }
        var encoded = new Buffer(data).toString('base64');
        console.log("start" + encoded + "End");
        return encoded;
    });
}

VisionClient.prototype.detectImage = function(imagePath, featureType, maxResults, callback) {
  var body = {
    requests: [
      {
        image: {
          content: imagePath
        },
        features: [
          {
            type: VisionClient.FEATURE_TYPES[featureType],
            maxResults: maxResults
          }
        ]
      }
    ]
  };

  unirest.post(VisionClient.GOOGLE_VISION_API_URL + '?key=' + this.key)
    .header({ 'Content-Type': 'application/json' })
    .send(body)
    .end(function (response) {
      callback(response.error, response.body);
    });
};

module.exports = VisionClient;
