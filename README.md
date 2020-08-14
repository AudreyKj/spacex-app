## SpaceX app with React

React app that retrieves info about SpaceX's launches through the SpaceX-API.<br />
The app is fully responsive. It features search and filter features about SpaceX's launches as well as data visualization. <br />
I’ve used Create React App to kickstart the project, as it comes with babel and webpack configured and is supported by a broad range of browsers for production builds. <br/>

## Implementation

My implementation aims at displaying information as clearly as possible, with a focus on usability and responsiveness. <br/><br/> I've chosen React because it ensures great and fast user experience when UI elements change. I've mostly used stateless function components and Hooks (useState, useEffect) because of their readability and flexibility. I've used Material-Ui to ensure a professional, sleek styling. <br/><br/>
The app's components and main features have been all tested with Jest. <br/>

## Future improvements

- create a separate data visualization component and create more charts for the launches' main aspects
- Redux would be better to manage the state in a bigger app if other components also needed the data from the API
- add polyfills for older browsers
- improve the app's accessibility
- add React-Helmet for SEO
- add more tests

## Features

- get data about SpaceX through API call
- data visualization showing success/failure of launches
- search information about the launches
- filter out information (success/failure, date, future launches)

## Tech

**Stack**: SASS/SCSS, JavaScript, React, React Hooks, chart.js, Jest
