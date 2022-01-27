import React, { useRef, useState } from 'react';
import { Button, ButtonProps, ClickAwayListener, MenuList, Paper, Popper } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

export interface DropdownButtonProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  persistent?: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ children, label, persistent = false, ...props }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button ref={buttonRef} onClick={handleToggle} endIcon={<ArrowDropDown />} {...props}>
        {label}
      </Button>

      <Popper anchorEl={buttonRef.current} open={open}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <MenuList onClick={() => (persistent ? null : handleClose())}>{children}</MenuList>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default DropdownButton;
