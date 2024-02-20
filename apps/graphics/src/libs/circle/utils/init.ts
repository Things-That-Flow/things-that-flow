// WebGLRenderingContext의 shader 타입은 런타임에 결정되는 값이다.
type ShaderLoaderType = WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER']

// gl context(gl)와 shader 타입(type), shader 소스 코드(source)를 전달받아 => 컴파일된 WebGLShader 객체 생성한다.
// shader 타입은 vertext shader 또는 fragment shader이다.
export const loadShader = (gl: WebGLRenderingContext, type: ShaderLoaderType, source: string): WebGLShader | null => {
  const shader = gl.createShader(type) // shader 객체 생성
  if (!shader) {
    console.error('Creating shader failed')
    return null
  }
  gl.shaderSource(shader, source) // shader source code를 shader 객체에 연결한다.
  gl.compileShader(shader) // shader를 컴파일한다.

  // 컴파일이 성공했는지 체크한다.
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader) // 컴파일을 실패한 경우, shader를 삭제한다.
    return null
  }

  return shader // 컴파일 성공한 shader 객체를 반환한다.
}

// vertext shader와 fragment shader를 연결하고 WebGLProgram 객체를 생성하는 함수
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

  const shaderProgram = gl.createProgram() // shader 프로그램 객체를 생성한다.
  if (!shaderProgram) {
    // 생성 실패 시
    console.error('Creating shader program failed')
    return null
  }
  // shader 프로그램에 컴파일된 shader 객체를 연결(attach)한다.
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  // wegbl context에 이렇게 연결된 shader 프로그램을 연결(link)한다.
  gl.linkProgram(shaderProgram)

  // webgl context에 프로그램이 연결되었는지 확인한다.
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ', gl.getProgramInfoLog(shaderProgram))
    return null
  }

  return shaderProgram
}
