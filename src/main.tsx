import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import environment from './RelayEnvironment';
import { StarWarsPeople } from './module/StarWars/StarWarsPeople';
import { StarWarsPeoplePaginated } from './module/StarWars/StarWarsPeoplePaginated';
import { Box, ThemeProvider } from '@ttoss/ui';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StarWarsPeople />,
  },
  {
    path: '/people-paginated',
    element: <StarWarsPeoplePaginated />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider>
        <Box sx={{ padding: 'xl' }}>
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
