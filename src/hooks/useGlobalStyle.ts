import { useContext } from 'react';
import GlobalStyleContext from '@/common/contexts/GlobalStyleContext';

export default function useGlobalStyle() {
  return useContext(GlobalStyleContext);
}
