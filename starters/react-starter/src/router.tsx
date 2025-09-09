import { Layout } from '@/components/layout/Layout'
import { ProductsPage } from '@/modules/products/ProductsPage'
import { SettingsPage } from '@/modules/settings/SettingsPage'
import { createBrowserRouter, redirect } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect('/products')
        },
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])
