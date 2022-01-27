import React from 'react';
import { MenuItem, MenuItemProps } from '@material-ui/core';

export interface DropdownItemProps extends Omit<MenuItemProps, 'button'> {}

const DropdownButton: React.FC<DropdownItemProps> = ({ children, ...props }) => {
  return (
    <MenuItem button {...props}>
      {children}
    </MenuItem>
  );
};

export default DropdownButton;
