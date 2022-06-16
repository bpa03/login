/* eslint-disable no-unused-vars */
import { useState, ChangeEvent, FormEvent } from 'react';

type InputElement = HTMLInputElement;
type FormElement = HTMLFormElement;
type EventChangeType = ChangeEvent<InputElement>;
type EventSubmitType = FormEvent<FormElement>;
type HookReturnType<S> = [
  S,
  (e: EventChangeType) => void,
  (e: EventSubmitType) => void,
];

export default function useForm<T>(
  initialValues: T,
  callback: (values: T) => void,
): HookReturnType<T> {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleChange = (e: EventChangeType): void => {
    const value = e.target.value as string;
    const name = e.target.name as string;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: EventSubmitType) => {
    e.preventDefault();

    callback(formValues);
  };

  return [formValues, handleChange, handleSubmit];
}
