import useDrawCircleWithWebGL from '../data-access-draw-circle/useDrawCircleWithWebGL'
import { ColorOfCircleType, SizeOfCircleType } from '../types'

interface Props {
  size: Record<SizeOfCircleType, number>
  color: Record<ColorOfCircleType, number>
}

const Circle2DWithWebGL = ({ size, color }: Props) => {
  const { ref } = useDrawCircleWithWebGL({
    color
  })

  return <canvas ref={ref} {...size} />
}

export default Circle2DWithWebGL
