import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPAge from '../pages/LoginPAge';
import ProfilePage from '../pages/ProfilePage';
import Layout from '../layout/Layout';
import ProtectedRoutes from '../components/protectedRoutes';

function AppRoutes() {
  const AppRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        { path: '/login', element: <LoginPAge /> },
        {
          path: '/profile/:id',
          element: (
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={AppRoutes} />;
}

export default AppRoutes;
