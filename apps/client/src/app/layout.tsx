import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { GlobalStyle } from '@ttflow/design-system'

import CirclePage from './circle/page'
import HomePage from './page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/circle',
    element: <CirclePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
)
