'use strict';

var clientId = '796081221437-oveuscg189sksuahabqonb3lghjidogi.apps.googleusercontent.com';
var clientSecret = '6XB7iZJU1LGMnb2OVj4dlCws';
var redirectUrl = 'http://localhost:8080/oauth2callback';

var projectId = 'cameraproject2';
var bucketName = 'your-bucket-name';

var credentialsApiKey = 'AIzaSyAXqzL2BH7-YyfG9KMUg8qzTnf0e34mOsc';

//all these variables get exported, can be addressed via './config.---'
module.exports = {
    port: process.env.PORT || 8080,

    // Secret is used by sessions to encrypt the cookie.
    secret: process.env.SESSION_SECRET || 'keyboard cat',

    // The client ID and secret can be obtained by generating a new web
    // application client ID on Google Developers Console.
  /*oauth2: {
   clientId: process.env.OAUTH_CLIENT_ID || clientId,
   clientSecret: process.env.OAUTH_CLIENT_SECRET || clientSecret,
   redirectUrl: process.env.OAUTH2_CALLBACK || redirectUrl,
   scopes: ['email', 'profile']
   },*/

    // Google Developers Console Project Id.
    gcloud: {
        projectId: process.env.GCLOUD_PROJECT || projectId
    },

  /*gcloudStorageBucket: process.env.CLOUD_BUCKET || bucketName,
   dataBackend: 'datastore',*/

    //ALL API KEYS:
    gcloudVision: {
        key: process.env.CLOUD_VISION_KEY || credentialsApiKey
    }

    //googe drive api key
};
