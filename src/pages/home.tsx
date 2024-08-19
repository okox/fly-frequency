import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FlightStatus } from "../../backend/types/flight-status";
import FlightInputSearch from "../components/FlightInputSearch";
import FlightStatusCard from "../components/FlightStatusCard";

export default function Home() {
  const [events, setEvents] = useState<{ flightStatus: FlightStatus, prevStatus: FlightStatus | null }[]>([]);
  const [filterText, setFilterText] = useState(""); 

  useEffect(() => {
    const connectWebSocket = () => {
      const webSocket = new WebSocket('ws://localhost:8181');
  
      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
  
        const flightStatus = {
          flightNumber: data.newStatus.flightNumber,
          equipmentRegistration: data.newStatus.equipmentRegistration,
          departure: {
            airport: data.newStatus.departure.airport,
            scheduled: new Date(data.newStatus.departure.scheduled),
            actual: data.newStatus.departure.actual && new Date(data.newStatus.departure.actual),
          },
          arrival: {
            airport: data.newStatus.arrival.airport,
            scheduled: new Date(data.newStatus.arrival.scheduled),
            actual: data.newStatus.arrival.actual && new Date(data.newStatus.arrival.actual),
          },
          status: data.newStatus.status,
        };
  
        setEvents((events) => {
          const filteredEvents = events.filter(event => event.flightStatus.flightNumber !== flightStatus.flightNumber);
          return [...filteredEvents, { flightStatus, prevStatus: data.prevStatus  }];
        });
      };
  
      webSocket.onclose = () => {
        console.log('WebSocket closed. Attempting to reconnect...');
        setTimeout(() => {
          connectWebSocket();
        }, 1000); // Attempt to reconnect after 1 second
      };
  
      return () => { webSocket.close(); };
    };
  
    connectWebSocket(); // Initial connection
  
  }, []);

  // Filter events based on the filter text, or show all if filterText is empty
  const filteredEvents = filterText
    ? events.filter(event =>
        event.flightStatus.flightNumber.toLowerCase().includes(filterText.toLowerCase())
      )
    : events;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 4 }}>
      {/* Use the FlightInputSearch component */}
      <FlightInputSearch
        filterText={filterText}
        onFilterTextChange={setFilterText} // Pass the filterText state and the setter function
      />

      {/* Display filtered events */}
      {filteredEvents.reverse().map((event, index) => (
        <FlightStatusCard key={index} flightStatus={event.flightStatus} prevStatus={event.prevStatus} />
      ))}
    </Box>
  );
}
