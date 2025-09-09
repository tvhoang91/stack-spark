import { Layout } from '@/components/layout/Layout'
import { ProductCreateSheet } from '@/modules/products/ProductCreateSheet'
import { ProductEditSheet } from '@/modules/products/ProductEditSheet'
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
        children: [
          {
            path: 'create',
            element: <ProductCreateSheet />,
          },
          {
            path: 'edit/:productId',
            element: <ProductEditSheet />,
          },
          // {
          //   path: '*',
          //   element: undefined,
          // },
        ],
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])
