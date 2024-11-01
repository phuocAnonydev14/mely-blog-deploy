'use client';
import React, { PropsWithChildren } from 'react';
import { ContainerStyle } from './Container.style';

const Container = ({ children }: PropsWithChildren) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

export default Container;
