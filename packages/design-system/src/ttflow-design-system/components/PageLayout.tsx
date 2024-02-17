import { ReactNode } from 'react'

import { css } from '@emotion/react'

import { colors } from '../constants/color'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 650px;
        width: 100%;
        padding: 0 4%;
        margin: 0 auto;
        height: auto;
      `}
    >
      <div
        css={css`
          background: ${colors.background};
        `}
      >
        {children}
      </div>
    </div>
  )
}
