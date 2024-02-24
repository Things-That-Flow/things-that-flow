import { useEffect, useRef } from 'react'

import { ColorPropsWithOthers } from '@/libs/shared/types/color'
import { SizeProp } from '@/libs/shared/types/size'

import init from '../util-init'

type Props = SizeProp

const RectPrimitiveWithWebGL = ({ color, size }: ColorPropsWithOthers<Props>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    init({
      canvas: canvasRef.current,
      color
    })
  }, [color])

  return <canvas ref={canvasRef} width={size.width} height={size.height} />
}

export default RectPrimitiveWithWebGL
