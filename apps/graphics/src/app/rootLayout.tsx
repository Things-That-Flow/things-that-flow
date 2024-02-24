import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { GlobalStyle } from '@ttflow/design-system'

import NotFoundPage from './not-found/page'
import HomePage from './page'
import PrimitivesPage from './primitives/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/primitives',
    element: <PrimitivesPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
)
