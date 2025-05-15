// app/ReduxProvider.tsx
'use client';          
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/redux/store'; 

type Props = { children: React.ReactNode };

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
