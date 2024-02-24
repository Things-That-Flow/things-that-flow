import { ColorPropsWithOthers } from '@/libs/shared/types/color'

import GLCommander from '../util-gl-commander'

type Params = {
  canvas: HTMLCanvasElement
}

export default ({ canvas, color }: ColorPropsWithOthers<Params>) => {
  if (!canvas) {
    return
  }

  const gl = canvas.getContext('webgl')

  if (!gl) {
    return
  }

  const GLC = new GLCommander(gl)
  GLC.clear(color)
}
