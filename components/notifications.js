import { Box, Text } from 'native-base';
import { COLORS } from '../constants';

export default function Notification(props) {
  return (
    <Box
      bgColor={
        props.type === 'success'
          ? COLORS.success
          : props.type === 'error'
          ? COLORS.error
          : COLORS.secondary
      }
      px="4"
      py="2"
      borderRadius="md">
      <Text color={COLORS.white}>{props.message}</Text>
    </Box>
  );
}