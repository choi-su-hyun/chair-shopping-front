import { createContext } from 'react';

const userData: { name: string } = {
  name: 'context 개념',
};
export const Context = createContext(userData);
