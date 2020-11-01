import { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export default (labelText, key, formErrors = {}) => {
  const { state } = useContext(AuthContext);

  labelText = labelText.replace(/ /g, '_');
  const stateError = state.errors[key]?.find(
    ({ field }) => field === labelText,
  );
  if (formErrors[labelText]) {
    return formErrors[labelText];
  } else if (stateError) {
    return stateError.message;
  }
  return labelText.replace(/_/g, ' ');
};
