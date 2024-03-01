import { row } from '@/libs/shared/styles/layout/center'
import CircleWithWebGL from '@/libs/primitives/feature-primitive/CircleWithWebGL'
import RectWithWebGL from '@/libs/primitives/feature-primitive/RectWithWebGL'
import TriangleWithWebGL from '@/libs/primitives/feature-primitive/TriangleWithWebGL'

const Page = () => {
  const COLOR_TEMPLATE = {
    size: {
      width: 480,
      height: 480
    },
    color: {
      r: 142,
      g: 122,
      b: 181,
      a: 1
    }
  }

  return (
    <div css={row.layout}>
      <div css={row.layout}>
        <CircleWithWebGL {...COLOR_TEMPLATE} />
        <p
          css={{
            position: 'absolute',
            color: 'white',
            fontSize: '13px'
          }}
        >
          Welcome, Things That Flow World!!
        </p>
      </div>
      <div css={row.layout}>
        <RectWithWebGL {...COLOR_TEMPLATE} size={{ width: 240, height: 240 }} />
        <p
          css={{
            position: 'absolute',
            color: 'white',
            fontSize: '13px'
          }}
        >
          Welcome, Things That Flow World!!
        </p>
      </div>
      <div css={row.layout}>
        <TriangleWithWebGL {...COLOR_TEMPLATE} size={{ width: 240, height: 240 }} />
        <p
          css={{
            position: 'absolute',
            color: 'white',
            fontSize: '13px'
          }}
        >
          Welcome, Things That Flow World!!
        </p>
      </div>
    </div>
  )
}

export default Page
