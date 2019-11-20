# Earthquake Viewer App

Fetches earthquake data from the US Geological Survey and uses MapBox to display the 10 strongest earthquakes from the past 24 hours, all inside an interactive map. 

## Running the project

Clone the Git repository, navigate to the project directory and install required dependencies: 

```cd earthquake-app
   npm install```

From the project directory, you can run:

`npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

`npm run prod`

Builds the app for production to the `build` folder and serves it at [http://localhost:5000](http://localhost:5000).<br />
Alternatively, you can build and serve the production version in separate steps:

`npm run build`
<br />
`serve -s build`

## Reflection

I really enjoyed working on this project! It's the first time I used MapBox since during an internship 1.5 years ago, and it felt like the perfect tool for the job. Also, since the MapBox documentation doesn't reflect the most recent version of React, I found and used a wrapper package (`react-mapbox-gl`).

It's often best to separate components into different folders, however in this case, `styled-components` made it easy to name and organize the different divs inside the App.js file and still keep things readable. With a bit more time, I'd also add tests to make sure the different React Hooks I used work as expected (we used Jest at my most recent job).

Thanks for your feedback and for taking the time to review!