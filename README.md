# Cooper Test with BMI Data

This is a web application for storing Cooper Test results and BMI results.
The application is sending and retrieving data from a rails API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Built by: [Viktor Olsson](https://github.com/vick3d) and [Amanda Gibson](https://github.com/amandagibson)

Deployed with Netlify at https://av-cooper-test.netlify.com/

# Getting Started:

Under the repository name, click Clone or download. Copy the clone URL for the repository. Open Terminal. Change the current working directory to the location where you want the cloned directory to be made.

`git clone https://github.com/amandagibson/CooperClient.git`

# Installation:

run `npm install` in the terminal
# Available Scripts:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
### `npm run features`

Runs feature testing.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---

# Built with:

[React Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React)

Testing with:
[Jest](https://jestjs.io/),
[Enzyme](http://npmjs.com/package/enzyme)



## Question of the Week:
- In the current implementaion of the Cooper Challenge (the way we presented it to you), where are we doing the calculation or rather where do we check the result of the Cooper test. On the client or on the server?

- What are the pros and cons of doing it that way?

The calculations in the way the application was presented to us are made on the client side.

Pros:
Better user experience.
Less network bandwidth.
Reduced server load.

Cons:
Better availability and accessibility on mobile devices and old browsers with server calculations.