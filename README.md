## Installation

1. Install npm or yarn
```
npm install or yarn install
```
2. Sign up for an API key at geonames.org, weatherbit.io and pixabay.com

3. Configure environment variables using dotenv package
	1. Install the dotenv package
	```
	npm install dotenv or yarn add dotenv
	```
	2. Create a new `.env` file in the root of your project
	3. Fill the `.env` file with your API key like this:
	```
	geonames_USERNAME=******************
    weatherbit_KEY=******************
    pixabay_KEY=******************
	```
4. Start the project

Command | Action
:------------: | :-------------:
`npm run build-prod` or `yarn build-prod`| Build project
`npm start` or `yarn start` | Run project

5. Open browser at http://localhost:8088/
