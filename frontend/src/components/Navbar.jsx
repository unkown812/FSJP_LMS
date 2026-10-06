import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Avatar } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import { Badge } from './ui';

const roleLabel = (role) => (role === ROLES.ADMIN ? 'Admin' : role === ROLES.INSTRUCTOR ? 'Instructor' : 'Learner');

export const Navbar = ({ onToggleMenu }) => {
  const { user, isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (role === ROLES.ADMIN) return '/admin';
    if (role === ROLES.INSTRUCTOR) return '/instructor';
    return '/learner';
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'My Dashboard',
      onClick: () => navigate(getDashboardPath()),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: 'Log Out',
      onClick: handleLogout,
    },
  ];

  const linkClass = (path) =>
    `text-body-md transition-colors ${
      location.pathname === path ? 'text-ink font-medium' : 'text-body hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-blur no-print">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: menu trigger + wordmark */}
          <div className="flex min-w-0 items-center gap-5">
            {onToggleMenu && (
              <button
                type="button"
                onClick={onToggleMenu}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-ink transition-colors hover:bg-hairline lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuOutlined className="text-lg" />
              </button>
            )}

            <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="LMS Portal home">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm">
                {/* <DashboardOutlined /> */}
                <img src="favicon.png" alt="" />
              </span>
              <span className="text-body-md-strong tracking-[-0.02em] text-canvas">Edvanta</span>
            </Link>

            {/* Desktop link row */}
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              <Link to="/courses" className={linkClass('/courses')}>
                Explore Courses
              </Link>
              {isAuthenticated && role === ROLES.INSTRUCTOR && (
                <Link
                  to="/instructor/courses/new"
                  className={linkClass('/instructor/courses/new')}
                >
                  Create Course
                </Link>
              )}
            </nav>
          </div>

          {/* Right: account actions */}
          <div className="flex shrink-0 items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="hidden text-body-md text-body hover:text-ink md:inline-flex"
                >
                  Dashboard
                </Link>

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-sm px-1 py-1 transition-colors hover:bg-hairline"
                    aria-label="Account menu"
                  >
                    <Avatar
                      size={36}
                      src={user?.avatarUrl}
                      icon={!user?.avatarUrl && <UserOutlined />}
                      className="bg-primary text-on-primary"
                    />
                    <span className="hidden flex-col items-start sm:flex">
                      <span className="text-caption-strong leading-tight text-ink">
                        {user?.name || 'User'}
                      </span>
                      <Badge variant="outline" className="mt-1 px-1.5 py-0 text-mono-label">
                        {roleLabel(role)}
                      </Badge>
                    </span>
                  </button>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button type="default" className="hidden sm:inline-flex">
                    Sign in
                  </Button>
                  <span className="text-body-md text-ink sm:hidden">Sign in</span>
                </Link>
                <Link to="/register">
                  <Button type="primary">Get started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
