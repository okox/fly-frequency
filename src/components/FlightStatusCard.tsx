import { FlightLand, FlightTakeoff } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { FlightStatus } from '../../backend/event-generator';

const getStatusColor = (status: FlightStatus['status']) => {
  switch (status) {
    case 'SCHEDULED': return 'info';
    case 'DEPARTED': return 'warning';
    case 'ARRIVED': return 'success';
    case 'CANCELED': return 'error';
    default: return 'default';
  }
};

const FlightStatusCard = ({ flightStatus, prevStatus }: { flightStatus: FlightStatus, prevStatus?: FlightStatus | null }) => {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, px: 2, "&:last-child": { pb: 1 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
          <Typography variant="h6" component="div">
            {flightStatus.flightNumber}
          </Typography>
          {flightStatus.equipmentRegistration && (
            <Typography variant="body2" color="text.secondary">
              Reg: {flightStatus.equipmentRegistration}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <FlightTakeoff sx={{ mr: 1 }} />
          <Box>
            <Typography variant="body1">{flightStatus.departure.airport}</Typography>
            <Typography variant="body2" color="text.secondary">
              {(flightStatus.departure.actual || flightStatus.departure.scheduled).toISOString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <FlightLand sx={{ mr: 1 }} />
          <Box>
            <Typography variant="body1">{flightStatus.arrival.airport}</Typography>
            <Typography variant="body2" color="text.secondary">
              {(flightStatus.arrival.actual || flightStatus.arrival.scheduled).toISOString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
          <Chip
            label={flightStatus.status}
            color={getStatusColor(flightStatus.status)}
            sx={{ mb: 1 }}
          />
          {prevStatus && prevStatus.status !== flightStatus.status && (
            <Chip
              label={`Prev: ${prevStatus.status}`}
              color={getStatusColor(prevStatus.status)}
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
      <CardContent sx={{ display: 'flex', py: 1, px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {flightStatus.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            at {new Date().toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightStatusCard;
