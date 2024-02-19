export type SizeOfCircleType = 'width' | 'height'

export type ColorOfCircleType = 'r' | 'g' | 'b' | 'a'

export interface ProgramInfo {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
  }
  uniformLocations: {
    color: WebGLUniformLocation | null
  }
}
