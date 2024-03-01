import useDrawCircle from '../data-access-draw/useDrawCircle'
import { ColorParamWithOthers } from '../types/color'
import { SizeProp } from '../types/size'

type Props = SizeProp

const CircleWithWebGL = ({ size, color }: ColorParamWithOthers<Props>) => {
  const { ref } = useDrawCircle({
    color
  })

  return <canvas ref={ref} {...size} />
}

export default CircleWithWebGL
