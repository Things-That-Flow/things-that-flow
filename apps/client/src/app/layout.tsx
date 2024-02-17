import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { GlobalStyle } from '@ttflow/design-system'

import HomePage from './page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
)
