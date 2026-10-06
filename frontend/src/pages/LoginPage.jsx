import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, LockOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import { GradientRibbon } from '../components/ui';

const ASSURANCES = [
  'Progress syncs across every device',
  'Certificates carry a verifiable code',
  'Quizzes graded by the server, not a timer',
];

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const loggedInUser = await login({
        email: values.email.trim(),
        password: values.password,
      });

      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (loggedInUser.role === ROLES.ADMIN) {
        navigate('/admin');
      } else if (loggedInUser.role === ROLES.INSTRUCTOR) {
        navigate('/instructor');
      } else {
        navigate('/learner');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="band band-dark bleed -mt-6 min-h-[70vh] md:-mt-10">
      <div className="container-app py-14 md:py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Value panel */}
          <div className="max-w-xl space-y-6">
            <p className="eyebrow">Sign in</p>
            <h1 className="text-display-xxl text-on-dark">Welcome Back</h1>
            <p className="lead">Sign in to continue your learning journey.</p>

            <div className="relative hidden max-w-md lg:block">
              <GradientRibbon />
            </div>

            <ul className="space-y-3 border-t border-hairline-dark pt-6">
              {ASSURANCES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircleFilled className="mt-0.5 text-accent-mint" />
                  <span className="text-body-md text-on-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- Form card */}
          <div className="card w-full max-w-[520px] justify-self-center lg:justify-self-end">
            <div className="card-pad-lg">
              <p className="eyebrow">Account access</p>
              <h2 className="mt-3 text-display-lg text-ink">Log in to Edvanta</h2>

              {errorMessage && (
                <Alert
                  message="Sign In Failed"
                  description={errorMessage}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setErrorMessage(null)}
                  className="mt-6"
                />
              )}

              <Form
                name="loginForm"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                size="large"
                className="mt-6"
              >
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email address' },
                    { type: 'email', message: 'Please enter a valid email address' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="mr-1 text-body" />}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="mr-1 text-body" />}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </Form.Item>

                <Form.Item className="mt-8 mb-0">
                  <Button type="primary" htmlType="submit" loading={loading} block size="large">
                    Log In
                  </Button>
                </Form.Item>

                <p className="mt-6 text-center text-caption text-body">
                  Don&apos;t have an account yet?{' '}
                  <Link
                    to="/register"
                    className="text-ink underline underline-offset-4 hover:text-body"
                  >
                    Create an account
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
