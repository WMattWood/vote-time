# vote-time

An interactive pie chart graph built using vanilla JS and the capabilities of SVG dash properties. For each of the buttons at the bottom of the screen, clicking on the respective colour will cause the graph to update in real time with a smooth animation.  This project taught me about some interesting edge cases with regards to how different browsers handle SVG animation.  It is currently hosted on Github Pages and is deployed using a Github actions .yaml script.  The score can be tracked via a connection to a Firebase database instance, however this feature is currently kept offline.  A feature that I would like to implement is the ability for multiple users to modify the score in real time, however this will require more research into the best way to queue a large number of requests as well as possibly handling debouncing.

Hosted live here: [https://wmattwood.github.io/vote-time/](https://wmattwood.github.io/vote-time/)

NOTE: Usage on iOS is reported to be choppy - it looks better on other browsers!  This is something I am working on, however it may require a completely different implementation of the pie chart rendering logic... tbd. 


https://user-images.githubusercontent.com/47619076/222253426-d711a695-250d-4793-b24f-452880cda8b1.mov


# Changelog
#### v0.4 
- Temporarily rolling back database features while searching for a more performant animation logic.
- Added a new video demo

#### v0.3 
- Added a timer
- Added automatic anonymous firebase signin to each unique session
- All sessions are now reactive to the database 'single source of truth'
- Values reset every 30 seconds.

#### v0.2 
- Pie chart now looks way cooler - changed colors and added a lighting effect.

#### v0.1 
- Pie chart displays and reacts in real time! Neat.
