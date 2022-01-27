import React from 'react';
import { FormControl, createStyles, InputLabel, withStyles, InputProps } from '@material-ui/core';

export interface ChipInputProps extends InputProps {
  label?: string;
}

export type ChipInputClassKey = 'root';

const chipInputStyles = () =>
  createStyles<ChipInputClassKey, ChipInputProps>({
    root: {},
  });

const ChipInput: React.FC<ChipInputProps> = (props) => {
  return (
    <FormControl>
      <InputLabel />
    </FormControl>
  );
};

export default withStyles(chipInputStyles, { name: 'YCDChipInput' })(ChipInput);
