import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import store from './store';

import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { Root,ChartsAndMaps,Contacts, ErrorPage} from './routes'
import { Provider } from 'react-redux';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "charts",
        element: <ChartsAndMaps />
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider >
    </Provider>
  </React.StrictMode>,
)
