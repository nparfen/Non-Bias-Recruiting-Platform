# Non-Bias Recruiting Platform

Demo of non-bias recruiting platform using MongoDB, Fastify, Swagger, Google Cloud Storage, React.js, Redux.js, Google Places API and Material-UI

## Prerequisite

- [npm](https://www.npmjs.com/)
- [Node](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
  * for example you can use cloud hosted MongoDB by [mlab.com](https://mlab.com)
- [Google Cloud Storage](https://cloud.google.com/storage/)
  * create new project, enable Google Cloud Storage JSON API, create service account and import the private key ([tutorial](https://www.woolha.com/tutorials/node-js-upload-file-to-google-cloud-storage))
- [Google Places API](https://cloud.google.com/maps-platform/)
  * enable Places API, select the project and create API key
- [Sign In with LinkedIn](https://www.linkedin.com/developers/)
  * create an app

## Steps
### 1. Clone the repository

Clone the `Non-Bias Recruiting Platform` repo locally. In a terminal, run:
```
git clone https://github.com/nparfen/Non-Bias-Recruiting-Platform.git
```

### 2. Server

Go to the `api` folder and install the dependency:
```
cd api/
npm install
```

Rename Google Cloud Storage JSON API private key to `gcs.json` and copy it into the root of `api` folder. Then create `.env` file into the root of the folder. Also you can create `.env.development` and `.env.production` files if you need to specify different environments. Input the values:
```
PORT=
API_URL=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
LINKEDIN_AUTH_ID=
LINKEDIN_AUTH_SECRET=
LINKEDIN_CALLBACK=
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_BUCKET=
SWAGGER_HOST=
SWAGGER_SCHEMES=
```

Then run the server:
```
npm start
```

### 3. Client

Go into the `client` folder and install the dependency:
```
cd ..
cd client/
npm install
```

Create `.env` file into the root of the `client` folder. Also you can create `.env.development` and `.env.production` files if you need to specify different environments. Input the values:
```
REACT_APP_NAME=
REACT_APP_GOOGLE_PLACES_API_KEY=
REACT_APP_API_URL=
REACT_APP_LINKEDIN_WINDOW= // api url + /login/linkedin
```

Then start the web application:
```
npm start
```

The application should now be running at:
`http://localhost:3000`