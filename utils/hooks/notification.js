import { Toast } from 'native-base';
import { Notification } from '../../components';

export default function notification({ type = 'normal', message }) {
  switch (type) {
    case 'success':
      Toast.show({
        render: () => <Notification type={type} message={message} />,
        placement: 'top',
      });
      break;

    case 'error':
      Toast.show({
        render: () => <Notification type={type} message={message} />,
        placement: 'top',
      });
      break;

    default:
      Toast.show({
        render: () => <Notification type={type} message={message} />,
        placement: 'top',
      });
      break;
  }
}