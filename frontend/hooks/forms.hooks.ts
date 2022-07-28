import { ChangeEvent, useState } from "react";

function useInput(initialValue: string, className: string, error: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  if (error) className += " form-page__input_error";

  return { onChange, value, className };
}

export { useInput };
