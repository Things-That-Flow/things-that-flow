// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional triangle.
const initBuffers = (gl: WebGLRenderingContext) => {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer()
  if (!positionBuffer) {
    throw new Error('Unable to create buffer')
  }

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // Now create an array of positions for the triangle.
  const positions = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0]

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return {
    position: positionBuffer
  }
}

export default initBuffers
