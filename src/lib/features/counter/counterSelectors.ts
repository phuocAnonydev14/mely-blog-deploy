import { RootState } from '@/lib/store';

export const selectCounter = (state: RootState) => state.counter;
