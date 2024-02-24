import { ColorPropsWithOthers } from '@/libs/shared/types/color'
import { SizeProp } from '@/libs/shared/types/size'

import useDrawCirclePrimitiveWithWebGL from '../data-access-draw-circle/useDrawCirclePrimitiveWithWebGL'

type Props = SizeProp

const CirclePrimitiveWithWebGL = ({ size, color }: ColorPropsWithOthers<Props>) => {
  const { ref } = useDrawCirclePrimitiveWithWebGL({
    color
  })

  return <canvas ref={ref} {...size} />
}

export default CirclePrimitiveWithWebGL
