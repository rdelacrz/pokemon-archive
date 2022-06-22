import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import './styles.scss';

interface LoginSidePanelProps {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

export const LoginSidePanel: FC<LoginSidePanelProps> = ({ visible, setVisible }) => {
  const formik = useFormik({
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
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Sidebar
      className='login-side-panel-wrapper'
      visible={visible}
      position='right'
      onHide={() => setVisible(false)}
    >
      <form id='loginForm' onSubmit={formik.handleSubmit}>
        <div className='field'>
          <label htmlFor="username">Username</label>
          <InputText
            id='username'
            name='username'
            value={formik.values.username}
            placeholder='Username'
            onChange={formik.handleChange}
          />
          {Boolean(formik.errors.username) && (
            <small id="username-help" className="p-error">{formik.errors.username}</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor="username">Password</label>
          <Password
            id='password'
            name='password'
            value={formik.values.password}
            placeholder='Password'
            onChange={formik.handleChange}
          />
          {Boolean(formik.errors.password) && (
            <small id="password-help" className="p-error">{formik.errors.password}</small>
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