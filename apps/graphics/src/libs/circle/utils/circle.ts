import { ColorOfCircleType, ProgramInfo } from '../types'

export const drawCircle = (
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  color: Record<ColorOfCircleType, number>
) => {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const positions: number[] = []
  const numSegments = 100
  const circleRadius = 0.5
  for (let i = 0; i < numSegments; i++) {
    const theta = (i / numSegments) * 2 * Math.PI
    positions.push(Math.cos(theta) * circleRadius, Math.sin(theta) * circleRadius, 0)
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  gl.useProgram(programInfo.program)

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

  if (programInfo.uniformLocations.color) {
    gl.uniform4f(programInfo.uniformLocations.color, color.r / 255, color.g / 255, color.b / 255, color.a / 1.0)
  }

  gl.drawArrays(gl.TRIANGLE_FAN, 0, numSegments)
}
