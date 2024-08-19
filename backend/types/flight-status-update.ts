/** It is indicated to not modify event-generator.ts file
  * but I would have extracted all types/interfaces
  */

import { FlightStatus } from './flight-status';

export type FlightStatusUpdate = { 
    prevStatus: FlightStatus | null;
    newStatus: FlightStatus;
    updatedAt: Date;
  }
  