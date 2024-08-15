import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FlightStatus } from "../../backend/event-generator";
import FlightStatusCard from "../components/FlightStatusCard";



export default function Home() {
  const [events, setEvents] = useState<FlightStatus[]>([]);


  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8181');
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const flightStatus = {
        flightNumber: data.flightNumber,
        equipmentRegistration: data.equipmentRegistration,
        departure: {
          airport: data.departure.airport,
          scheduled: new Date(data.departure.scheduled),
          actual: data.departure.actual && new Date(data.departure.actual),
        },
        arrival: {
          airport: data.arrival.airport,
          scheduled: new Date(data.arrival.scheduled),
          actual: data.arrival.actual && new Date(data.arrival.actual),
        },
        status: data.status,
      }
      setEvents((events) => [...events, flightStatus]);
    };
    return () => { webSocket.close() };
  }, []);
    


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 4 }}>
      {events.reverse().map((event, index) => (
        <FlightStatusCard key={index} flightStatus={event} />
      ))}
    </Box>
  )
}