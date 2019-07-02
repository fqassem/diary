# Diary - A Simple Personal Blog Publisher

A simple personal blog entry publisher using a NodeJS backend, React frontend, and a rich text editor. Data is only persisted in the Node server's memory, so it's only meant for demo purposes.

## Running the app

- _cd_ into the _diary-backend_ folder and _npm install_, then _npm run start_ to start the server. The server runs on port 3000
- _cd_ into the _diary-frontend_ folder and _npm install_, then  _npm run start_ to start the front end dev server. The front end runs on port 8000, but the api requests are proxied to localhost:3000 to avoid CORS issues

Navigate to localhost:8000 and start messing around.

## Callouts

* The React rich text library I used (React-RTE) isn't the greatest - it will only accept input initially if you touch near the very top line of the textarea. However, it works well enough for a demo. I haven't vetted it for performance but it seems to work on mobile and desktop.
* The app was done with minimal styling, but it should work well on mobile. 
* It's a demo app, so there isn't any testing or SEO.
* Ideally, I'd separate out the styled-components out of the main container to make it a bit less cluttered, but it's fine for now.