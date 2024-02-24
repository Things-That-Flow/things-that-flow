import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { GlobalStyle } from '@ttflow/design-system'

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
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
)
