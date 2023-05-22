import React from 'react';
import Select, { Props } from 'react-select';

type CustomSelectProps = Props & {
  name: string;
  error?: boolean;
};
function CustomSelect({ name, error, ...props }: CustomSelectProps) {
  return (
    <Select
      {...props}
      instanceId={name}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: '40px',
          width: '100%',
          borderRadius: '7px',
          borderWidth: '2px',
          boxShadow: state.isFocused || state.menuIsOpen ? 'none' : undefined,
          borderColor: error ? 'red' : undefined,
        }),
        placeholder: baseStyles => ({
          ...baseStyles,
          fontSize: '16px',
        }),
      }}
    />
  );
}

export default CustomSelect;
