import { useState } from 'react';

export const useInput = (initValue=undefined) => {
  const [value, setValue] = useState(initValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
  };
};
