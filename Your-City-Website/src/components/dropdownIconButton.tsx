import React, { useRef, useState } from 'react';
import { ClickAwayListener, IconButton, IconButtonProps, MenuList, Paper, Popper } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export interface DropdownButtonProps extends Omit<IconButtonProps, 'onClick'> {
  icon?: React.ReactNode;
  persistent?: boolean;
}

const DropdownIconButton: React.FC<DropdownButtonProps> = ({
  children,
  icon = <MoreVert />,
  persistent = false,
  ...props
}) => {
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
      <IconButton ref={buttonRef} onClick={handleToggle} {...props}>
        {icon}
      </IconButton>

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

export default DropdownIconButton;
