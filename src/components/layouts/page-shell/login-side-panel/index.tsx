import { FC, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { APIError } from '~/models';
import { userService } from '~/services';

import './styles.scss';

interface LoginFields {
  username: string;
  password: string;
}

interface LoginSidePanelProps {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

export const LoginSidePanel: FC<LoginSidePanelProps> = ({ visible, setVisible }) => {
  const [loginError, setLoginError] = useState<string>();

  const loginMutation = useMutation<boolean, APIError, LoginFields>(
    'login',
    ({ username, password }) => userService.authenticate(username, password),
    {
      onError: (apiError) => setLoginError(apiError.response?.data?.error),
      onSuccess: () => setLoginError(undefined),
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
      await loginMutation.mutateAsync(values);
    },
  });

  const usernameError = formik.errors.username || loginError;
  const passwordError = formik.errors.password || loginError;

  return (
    <Sidebar
      className='login-side-panel-wrapper'
      visible={visible}
      position='right'
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
            placeholder='Username'
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
            value={formik.values.password}
            placeholder='Password'
            onChange={formik.handleChange}
          />
          {Boolean(passwordError) && (
            <small id='password-help' className='p-error'>{passwordError}</small>
          )}
        </div>
        <div className='button-row'>
          <Button id='logInBtn' type='submit'>
            Log In
          </Button>
        </div>
      </form>
    </Sidebar>
  );
}

export default LoginSidePanel;