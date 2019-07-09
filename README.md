# Diary - A Simple Personal Blog Publisher

A simple personal blog entry publisher using a ~NodeJS backend~ Firebase backend, React frontend, Styled-Components, Material UI, and a rich text editor. ~Data is only persisted in the Node server's memory, so it's only meant for demo purposes.~ Data is persisted and retreived from Firebase. You must create a user and authorize yourself to use the app. FYI it's still a work in progress and design is not finalized.

## Running the app

In Firebase, create a new project and grab its configuration. You'll need an *.env* file that lives in the root of the app (at the same level as the *package.json*). It should look like this:

~~~~
REACT_APP_FIREBASE_API_KEY = "your_api_key"
REACT_APP_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
REACT_APP_FIREBASE_DATABASE_URL = "your_database_url"
REACT_APP_FIREBASE_PROJECT_ID = "your_project_id"
REACT_APP_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "your_sender_id"
REACT_APP_FIREBASE_APP_ID = "your_app_id"
~~~~

Once your config is done, _cd_ into the _diary-frontend_ folder and _npm install_, then  _npm run start_ to start the server.

Navigate to localhost:8000 and start messing around.

## Callouts

* The React rich text library I used (React-RTE) isn't the greatest - it will only accept input initially if you touch near the very top line of the textarea. However, it works well enough for a demo. I haven't vetted it for performance but it seems to work on mobile and desktop.
* The app was done with minimal styling, but it should work well on mobile. 
* It's a demo app, so there isn't any testing or SEO.
* Ideally, I'd separate out the styled-components out of the main container to make it a bit less cluttered, but it's fine for now.

## Todo

* ~Create DB rules for user~
* Create HOC for user data for stuff like name, greetings, etc
* Add delete and edit capability for posts
* Add tests