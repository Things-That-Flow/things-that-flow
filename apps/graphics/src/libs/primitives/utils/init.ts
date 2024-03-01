import { loadShader } from './load'

// vertext shader와 fragment shader를 연결하고 WebGLProgram 객체를 생성하는 함수
// Creates a shader program, so WebGL knows how to draw our data
export const initShaderProgram = (
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null => {
  // shader 객체
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  if (!vertexShader || !fragmentShader) {
    // 컴파일이 실패되면 shader 자체를 삭제하므로 여기서 validation 처리
    console.error('Creating shader failed')
    return null
  }

  // Create the shader program
  const shaderProgram = gl.createProgram() // shader 프로그램 객체를 생성
  // Only proceed if the shader program was successfully created.
  if (!shaderProgram) {
    // 생성 실패 시
    alert('Creating shader program failed. || Failed to initialize shader program.')
    return null
  }
  // shader 프로그램에 컴파일된 shader 객체를 연결(attach)
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  // wegbl context에 이렇게 연결된 shader 프로그램을 연결(link)
  gl.linkProgram(shaderProgram)

  // webgl context에 프로그램이 연결되었는지 확인한다.
  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
    return null
  }

  return shaderProgram
}

// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional triangle.
export const initBuffers = (gl: WebGLRenderingContext) => {
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
