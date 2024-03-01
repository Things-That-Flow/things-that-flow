import { ColorType } from '../../types/color'
import { Buffers, Program } from '../../types/program'

const drawTriangle = (gl: WebGLRenderingContext, programObject: Program, buffers: Buffers, color: ColorType) => {
  gl.clearColor(0, 0, 0, 0) // Clear to transparent, fully opaque
  gl.clearDepth(1.0) // Clear everything
  gl.enable(gl.DEPTH_TEST) // Enable depth testing
  gl.depthFunc(gl.LEQUAL) // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 3 // pull out 3 values per iteration
    const type = gl.FLOAT // the data in the buffer is 32bit floats
    const normalize = false // don't normalize
    const stride = 0 // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0 // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(programObject.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset)
    gl.enableVertexAttribArray(programObject.attribLocations.vertexPosition)
  }

  // Tell WebGL to use our program when drawing
  gl.useProgram(programObject.program)

  if (programObject.uniformLocations.color) {
    // 색상 존재하면, shader 프로그램의 색상 uniform에 원의 색상을 설정한다.
    // 색상 값은 [0, 1] 범위로 정규화해서 전달한다.
    gl.uniform4f(programObject.uniformLocations.color, color.r / 255, color.g / 255, color.b / 255, color.a / 1.0)
  }

  {
    const offset = 0
    const vertexCount = 3
    gl.drawArrays(gl.TRIANGLES, offset, vertexCount)
  }
}

export default drawTriangle
