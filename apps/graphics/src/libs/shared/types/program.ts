export type Program = {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
  }
  uniformLocations: {
    color: WebGLUniformLocation | null
  }
}
