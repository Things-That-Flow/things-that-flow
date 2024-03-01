import { useEffect, useRef } from 'react'

import { ColorParamWithOthers } from '../types/color'
import { SizeProp } from '../types/size'
import initContext from '../utils/init-context'

type Props = SizeProp

const RectWithWebGL = ({ color, size }: ColorParamWithOthers<Props>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    initContext({
      canvas: canvasRef.current,
      color
    })
  }, [color])

  return <canvas ref={canvasRef} width={size.width} height={size.height} />
}

export default RectWithWebGL
