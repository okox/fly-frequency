import WebSocket, { WebSocketServer } from 'ws';
import { simulateFlights } from './event-generator';

const wss = new WebSocketServer({ port: 8181 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

simulateFlights(1000, (event) => {
  console.log('Sending event:', event);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(event));
    }
  });
});

console.log('WebSocket server started on port 8181 🚀');