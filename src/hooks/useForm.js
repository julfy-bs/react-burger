import { useCallback, useState } from 'react';
import { PATTERN_EMAIL } from '../utils/constants.js';

export const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const checkIsEmailValid = useCallback((value) => PATTERN_EMAIL.test(value), []);

  const handleChange = useCallback((e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest('form');
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      (!target.validationMessage && !checkIsEmailValid(value))
        ? setErrors({ ...errors, [name]: 'Введите валидный e-mail.' })
        : setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setIsValid(form.checkValidity());
  }, [errors, checkIsEmailValid, values]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
};