import { useContext } from 'react';
import AntMessageContext from '@/common/contexts/AntMessageContext';

export default function useAntMessage() {
  const messageApi = useContext(AntMessageContext);

  if (messageApi === null) {
    throw new Error('useAntMessage must be used within AntMessageProvider');
  }

  return messageApi;
}
