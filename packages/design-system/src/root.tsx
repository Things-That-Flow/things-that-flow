import ReactDOM from 'react-dom/client'

import Playground from './Playground'
import { GlobalStyle } from './ttflow-design-system/global'

import '@/sample/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <Playground />
  </>
)
