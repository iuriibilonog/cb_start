export const checkValidation = (data, validationParams) => {
  let errors = {};
  const emailSchema =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  validationParams.map((item) => {
    switch (item) {
      case 'email':
        if (!data['email']) return (errors['email'] = 'required_field');
        const isEmailValid = emailSchema.test(data['email']);
        if (!isEmailValid) errors['email'] = 'email_not_valid';

        break;
      case 'password':
        if (!data['password']) errors['password'] = 'required_field';

        break;

      case 'selectedCurrency':
        if (typeof data === 'string' || typeof data === 'number') {
          if (!data && data !== 0) errors[item] = 'required_field';
        } else {
          if (!data[item] && data[item] !== 0) errors[item] = 'required_field';
        }
        break;

      default:
        if (typeof data === 'string') {
          if (!data) errors[item] = 'required_field';
        } else {
          if (!data[item]) errors[item] = 'required_field';
        }
        break;
    }
  });

  return errors;
};
