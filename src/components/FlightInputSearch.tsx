import { TextField } from "@mui/material";
import React from "react";

interface FlightInputSearchProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
}

const FlightInputSearch: React.FC<FlightInputSearchProps> = ({ filterText, onFilterTextChange }) => {
  return (
    <TextField
      label="Filter by Flight Number"
      variant="outlined"
      value={filterText}
      onChange={(e) => onFilterTextChange(e.target.value)}
      sx={{ mb: 2, width: '100%' }}
    />
  );
};

export default FlightInputSearch;
