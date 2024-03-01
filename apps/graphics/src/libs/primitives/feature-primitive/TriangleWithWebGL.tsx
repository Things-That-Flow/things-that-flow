import useDrawTriangle from '../data-access-draw/useDrawTriangle'
import { ColorParamWithOthers } from '../types/color'
import { SizeProp } from '../types/size'

type Props = SizeProp

const TriangleWithWebGL = ({ size, color }: ColorParamWithOthers<Props>) => {
  const { ref } = useDrawTriangle({
    color
  })
  return <canvas ref={ref} {...size} />
}

export default TriangleWithWebGL
