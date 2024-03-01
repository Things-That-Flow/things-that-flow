import { ColorParamWithOthers } from '../../types/color'
import GLCommander from '../commander'

type Params = {
  canvas: HTMLCanvasElement
}

const initContext = ({ canvas, color }: ColorParamWithOthers<Params>) => {
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

export default initContext
