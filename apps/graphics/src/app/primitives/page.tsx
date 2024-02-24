import { layoutStyle } from '@/libs/shared/styles/layout/center'
import CirclePrimitiveWithWebGL from '@/libs/circle/feature-simple-circle-primitive/CirclePrimitiveWithWebGL'
import RectPrimitiveWithWebGL from '@/libs/rect/feature-simple-rect-primitive/RectPrimitiveWithWebGL'

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
    <div css={layoutStyle.layout}>
      <div css={layoutStyle.layout}>
        <CirclePrimitiveWithWebGL {...COLOR_TEMPLATE} />
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
      <div css={layoutStyle.layout}>
        <RectPrimitiveWithWebGL {...COLOR_TEMPLATE} size={{ width: 240, height: 240 }} />
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
