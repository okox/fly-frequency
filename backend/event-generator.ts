// Please do not modify this file

type FlightTime = {
  scheduled: Date;
  actual?: Date;
  airport: string;
};

export type FlightStatus = {
  flightNumber: string;
  equipmentRegistration?: string;
  departure: FlightTime;
  arrival: FlightTime;
  status: 'SCHEDULED' | 'DEPARTED' | 'ARRIVED' | 'CANCELED';
};

type FlightStatusCallback = (status: FlightStatus) => void;

class Flight {
  private status: FlightStatus;

  constructor(flightNumber: string, scheduledDeparture: Date, scheduledArrival: Date, departureAirport: string, arrivalAirport: string, equipmentRegistration?: string) {
    this.status = {
      flightNumber,
      equipmentRegistration,
      departure: { scheduled: scheduledDeparture, airport: departureAirport },
      arrival: { scheduled: scheduledArrival, airport: arrivalAirport },
      status: 'SCHEDULED',
    };
  }

  setActualDeparture(actualDeparture: Date): void {
    if (this.status.status === 'SCHEDULED') {
      this.status.departure.actual = actualDeparture;
      this.status.status = 'DEPARTED';
    }
  }

  setActualArrival(actualArrival: Date): void {
    if (this.status.status === 'DEPARTED') {
      this.status.arrival.actual = actualArrival;
      this.status.status = 'ARRIVED';
    }
  }

  setEquipmentRegistration(equipmentRegistration: string): void {
    if (this.status.status === 'SCHEDULED') {
      this.status.equipmentRegistration = equipmentRegistration;
    }
  }

  cancel(): void {
    if (this.status.status === 'SCHEDULED') {
      this.status.status = 'CANCELED';
    }
  }

  getStatus(): FlightStatus {
    return { ...this.status };
  }
}

function generateCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}



const createSimulatedFlight = (flightNumber: string, now: Date, isInitialSimulation = false): Flight => {
  const scheduledDeparture = new Date(now.getTime() + Math.random() * 14400000 - (isInitialSimulation ? 7200000 : 0)); // Random time in next 4 hours, move it back 2 hours if it's the initial simulation
  const scheduledArrival = new Date(scheduledDeparture.getTime() + Math.random() * 21600000); // Random time within 3 hours of departure
    
  const equipmentRegistration = Math.random() > 0.5 ? `N${Math.floor(100 + Math.random() * 900)}AA` : undefined;
  const departureAirport = generateCode();
  const arrivalAirport = generateCode();

  const flight = new Flight(flightNumber, scheduledDeparture, scheduledArrival, departureAirport, arrivalAirport, equipmentRegistration);

  if (isInitialSimulation) {
    if (now > flight.getStatus().departure.scheduled) {
      flight.setActualDeparture(new Date(now.getTime() - Math.random() * 3600000));
    }
    if (now > flight.getStatus().arrival.scheduled) {
      flight.setActualArrival(new Date(now.getTime() - Math.random() * 3600000));
    }
  }
  return flight;
}

export function simulateFlights(numFlights: number, onFlightStatusUpdate: FlightStatusCallback) {
  const flights: Flight[] = [];
  const flightNumbers = new Set<string>();
  const now = new Date();

  const createUniqueFlightNumber = () => {
    let flightNumber: string;
    do {
      flightNumber = `FL${Math.floor(1000 + Math.random() * 9000)}`;
    } while (flightNumbers.has(flightNumber));
    flightNumbers.add(flightNumber);
    return flightNumber;
  }

  // Create flights
  for (let i = 0; i < numFlights; i++) {
    const flight = createSimulatedFlight(createUniqueFlightNumber() ,now);
    flights.push(flight);
  }

  // Simulate events over time
  const simulationInterval = setInterval(() => {
    flights.forEach(flight => {
      const status = flight.getStatus();
      const currentTime = new Date();

      switch (status.status) {
        case 'SCHEDULED':
          if (currentTime >= status.departure.scheduled) {
            if (Math.random() < 0.05) { // 5% chance of cancellation
              flight.cancel();
            } else {
              const actualDeparture = new Date(status.departure.scheduled.getTime() + (Math.random() - 0.5) * 3600000); // +/- 30 minutes
              if (!status.equipmentRegistration) {
                flight.setEquipmentRegistration(`N${Math.floor(100 + Math.random() * 900)}AB`);
              }
              flight.setActualDeparture(actualDeparture);
            }
            onFlightStatusUpdate(flight.getStatus());
          } else {
            if (Math.random() < 0.0002) { // .02% chance of equipment registration being updated
              flight.setEquipmentRegistration(`N${Math.floor(100 + Math.random() * 900)}AA`);
              onFlightStatusUpdate(flight.getStatus());
            }
          }

          break;
        case 'DEPARTED':
          if (currentTime >= status.arrival.scheduled) {
            const actualArrival = new Date(status.departure.actual!.getTime() + 
              (status.arrival.scheduled.getTime() - status.departure.scheduled.getTime()) + 
              (Math.random() - 0.5) * 1800000); // +/- 15 minutes from expected duration
            flight.setActualArrival(actualArrival);
            onFlightStatusUpdate(flight.getStatus());
          }
          break;
        case 'ARRIVED':
        case 'CANCELED':
          { 
            // Remove flight from simulation and replace with new one
            flights.splice(flights.indexOf(flight), 1);
            flightNumbers.delete(status.flightNumber);
            const newFlight = createSimulatedFlight(createUniqueFlightNumber(), currentTime);
            flights.push(newFlight);
            onFlightStatusUpdate(newFlight.getStatus());
            break;
          }
      }
    });

    // End simulation when all flights are finished
    if (flights.length === 0) {
      clearInterval(simulationInterval);
      console.log("Simulation completed");
    }
  }, 1000); // Check every second

  return () => clearInterval(simulationInterval);
}

// Example usage
// function onFlightStatusUpdate(status: FlightStatus) {
//   console.log(`${new Date().toISOString()} - Flight ${status.flightNumber}: ${status.status}`);
//   console.log(JSON.stringify(status, null, 2));
// }

// simulateFlights(10, onFlightStatusUpdate);