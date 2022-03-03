import React from 'react';

const TextInput = React.forwardRef(({ label, helperText, ...rest }, ref) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text font-semibold text-gray-700'>{label}</span>
      </label>
      <input
        className='input input-primary input-bordered font-semibold'
        ref={ref}
        {...rest}
      />
      <label className='label'>
        <span className='label-text-alt'>{helperText}</span>
      </label>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
