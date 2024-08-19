/** It is indicated to not modify event-generator.ts file
  * but I would have extracted all types/interfaces
  */

import { FlightTime } from './flight-time';

export type FlightStatus = {
  flightNumber: string;
  equipmentRegistration?: string;
  departure: FlightTime;
  arrival: FlightTime;
  status: 'SCHEDULED' | 'DEPARTED' | 'ARRIVED' | 'CANCELED';
};


  