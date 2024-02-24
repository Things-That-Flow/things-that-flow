import { ColorProp } from '@/libs/shared/types/color'

class GLCommander {
  private gl: WebGLRenderingContext

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl
  }

  public clear = ({ r, g, b, a }: ColorProp): void => {
    this.gl.clearColor(r / 255, g / 255, b / 255, a)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }
}

export default GLCommander
