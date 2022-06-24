import { FC, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { APIError, User } from '~/models';
import { userService } from '~/services';
import { useAppDataContext } from '~/utils';

import './styles.scss';

interface LoginFields {
  username: string;
  password: string;
}

interface LoginFormModalProps {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

export const LoginFormModal: FC<LoginFormModalProps> = ({ visible, setVisible }) => {
  const [loginError, setLoginError] = useState<string>();
  const { setUsername } = useAppDataContext();

  const { isLoading, mutateAsync: login } = useMutation<User, APIError, LoginFields>(
    'login',
    ({ username, password }) => userService.authenticate(username, password),
    {
      onError: (apiError) => setLoginError(apiError.response?.data?.error),
      onSuccess: (user) => {
        setUsername(user?.username);    // Sets username in storage
        setLoginError(undefined);       // Clears any existing errors in login form
        setVisible(false);              // Hides login modal
      },
    }
  );

  const formik = useFormik<LoginFields>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Username required'),
        password: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Password required'),
    }),
    onSubmit: async (values) => {
      await login(values);
    },
  });

  const usernameError = formik.errors.username || loginError;
  const passwordError = formik.errors.password || loginError;

  return (
    <Dialog
      className='login-modal-wrapper'
      header='Login Form'
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <form id='loginForm' onSubmit={formik.handleSubmit}>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <InputText
            id='username'
            name='username'
            className={clsx({ 'p-invalid': Boolean(usernameError) })}
            value={formik.values.username}
            placeholder='Enter username'
            onChange={formik.handleChange}
          />
          {Boolean(usernameError) && (
            <small id='username-help' className='p-error'>{usernameError}</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='username'>Password</label>
          <Password
            id='password'
            name='password'
            className={clsx({ 'p-invalid': Boolean(passwordError) })}
            autoComplete='current-password'
            feedback={false}
            value={formik.values.password}
            placeholder='Enter password'
            onChange={formik.handleChange}
          />
          {Boolean(passwordError) && (
            <small id='password-help' className='p-error'>{passwordError}</small>
          )}
        </div>
        <div className='button-row'>
          <Button id='loginBtn' label='Log In' type='submit' loading={isLoading} />
        </div>
      </form>
    </Dialog>
  );
}

export default LoginFormModal;