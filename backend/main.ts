import WebSocket, { WebSocketServer } from 'ws';
import { simulateFlights } from './event-generator';
import { FlightStatus } from './types/flight-status';
import { FlightStatusUpdate } from './types/flight-status-update';
const wss = new WebSocketServer({ port: 8181 });

const previousFlightStatuses = new Map<string, FlightStatus>();

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send current flights to the newly connected client
  previousFlightStatuses.forEach((status) => {
  const flightStatusUpdate: FlightStatusUpdate = {
    prevStatus: null, // Since this is the first update the client receives, prevStatus is null
    newStatus: status,
    updatedAt: new Date(),
  };

  ws.send(JSON.stringify(flightStatusUpdate));
});

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

simulateFlights(1000, (event) => {
  const flightNumber = event.flightNumber;
  const prevStatus = previousFlightStatuses.get(flightNumber) || null;

  const flightStatusUpdate: FlightStatusUpdate = {
    prevStatus,
    newStatus: event,
    updatedAt: new Date(),
  };

  // Store the current status for future comparisons
  previousFlightStatuses.set(flightNumber, event);

  console.log('Sending event:', flightStatusUpdate);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(flightStatusUpdate));
    }
  });
});

console.log('WebSocket server started on port 8181 🚀');