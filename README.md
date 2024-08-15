# Frequency Flight Events App

This is a little app that shows flight status updates from a simulated data source. 

## Getting started
To run this app first use `npm i` to install the dependencies and then run it with `npm run dev`.
This command start a websocket backend and a react frontend.
- The backend listens on [ws://localhost:8181]()
- The frontend should be avaiable on [http://localhost:8180]()

Sometimes it can take a few seconds before the first simulated events are generated

## Task
Instead of only seeing the current status of flights it would be good to know what changed.

### Backend
Change the backend code so that events send to the websocket clients are implementing this interface:
```typescript
interface FlightStatusUpdate { 
  prevStatus: FlightStatus | null;
  newStatus: FlightStatus;
  updatedAt: Date;
}
```
This obiously means that you have to keep track of previous states! Do not change the event-generator.ts file. This emulates the third party you get updates from.

### Frontend
First of all update the websocket client to implement the new dataformat.

Change the flightcards to show what was changed. This can be done by changing the style of that property for example making it a different color or font weight. Or you add it as extra text, like: 'Flight departed at: ${departureTime}`

## Bonus tasks
There are many things that can be changed or improved. Some examples:
- If the backend restart the client websocket connection is not reconnecting
- It would be nicer only to show the most recent status for a flightnumber
- Instead of starting empty the client will get the current flights from the backend
- Search or filtering for the list in the UI


