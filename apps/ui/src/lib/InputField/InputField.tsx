import { forwardRef } from 'react';
import { Stack } from '../Stack';
import { If } from '../If';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/Input';

interface InputFieldProps extends InputProps {
  label?: string;
  error?: string;

  withAsterisk?: boolean;
}

interface InputLabelProps {
  children?: string;
  withAsterisk?: boolean;
  htmlFor?: string;
}

function FormFieldLabel({ children, withAsterisk, htmlFor }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className="flex gap-1 text-gray-600">
      {children}
      <If condition={Boolean(withAsterisk)}>
        <p className="text-red-600">*</p>
      </If>
    </label>
  );
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, error, withAsterisk, ...rest }, ref) => {
    return (
      <Stack className="gap-2">
        <If condition={Boolean(label)}>
          <FormFieldLabel htmlFor={id} withAsterisk={withAsterisk}>
            {label}
          </FormFieldLabel>
        </If>
        <Stack className="gap-2">
          <Input id={id} ref={ref} {...rest} />
          <If condition={Boolean(error)}>
            <p className="text-red-600 text-">{error}</p>
          </If>
        </Stack>
      </Stack>
    );
  }
);

InputField.displayName = 'InputField';
