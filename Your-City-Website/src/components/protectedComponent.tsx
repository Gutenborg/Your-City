import React from 'react';

export interface ProtectedComponentProps {}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ children, ...props }) => {
  return <React.Fragment>{sessionStorage.getItem('accessToken') && children}</React.Fragment>;
};

export default ProtectedComponent;
