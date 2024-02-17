import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import HomePage from './page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>
)
