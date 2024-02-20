import useDrawCircleWithWebGL from '../data-access-draw-circle/useDrawCircleWithWebGL'
import { ColorOfCircleType, SizeOfCircleType } from '../types'

interface Props {
  size: Record<SizeOfCircleType, number>
  color: Record<ColorOfCircleType, number>
}

const Circle2DWithWebGL = ({ size, color }: Props) => {
  const canvasRef = useDrawCircleWithWebGL({
    color
  })

  return <canvas ref={canvasRef} width={size.width} height={size.height} />
}

export default Circle2DWithWebGL
