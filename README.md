# Code Cats
By Alyna Takeuchi, Danish Akhtar, Joe Faulstick, and Leon Moraga
[https://github.com/TeamCodeCats/codecatsdotcom](https://github.com/TeamCodeCats/codecatsdotcom

## Description
Code Cats was the second major project created as part of the Berkeley Coding Cohort. Code Cats was designed to serve as a social media application that targets boot camp students and graduates to enable them to stay connected outside of the class room. The base platform was designed as a Facebook-lite that could easily be extended upon with additional functionality.

## Instructions
Follow the instructions below to install a local version of Code Cats.

### Requirements
* Node.js
* MySQL
* MySQL Workbench (Win) or Sequel Pro (Mac)
* A Google Developer account. Create one at [https://console.developers.google.com](https://console.developers.google.com).

### Setup

#### Project
1. Clone the Git repository to a local drive location.
2. Install the required node modules by running `npm install` from the root project directory using your Git terminal.
3. Use your preferred MySQL manager program and created a new db titled **codecats_db**.
4. Open config/config.json and modify the *development* key values to match your MySQL settings.

#### Google OAuth & Cookie Session
1. Create a new Google project at [https://console.developers.google.com](https://console.developers.google.com).
2. Create new credentials to generate a **client secret** and **client id**.
3. From the credentials screen, click on your project name and add *http://localhost:3000/auth/google/redirect* and *https://localhost:3000/auth/google/redirect* to the Authorized redirect URIs
4. Back in your project, navigate to your config folder and create a new file called **keys.js**.
5. In **keys.js** add the following code. Fill in your own **client secret**, **client id** and custom session key.

`module.exports = {
	google: {
		clientID: <clientID here>,
		clientSecret: <clientSecret here>
	},
	session: {
		cookieKey: <Custom key here>
	}
}`


### How To Use

### Closing