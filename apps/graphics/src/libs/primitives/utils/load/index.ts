// WebGLRenderingContext의 shader 타입은 런타임에 결정되는 값
type ShaderLoaderType = WebGLRenderingContext['VERTEX_SHADER'] | WebGLRenderingContext['FRAGMENT_SHADER']

// Creates a shader of the given type, uploads the source and
// compiles it.
// gl context(gl)와 shader 타입(type), shader 소스 코드(source)를 전달받아 => 컴파일된 WebGLShader 객체 생성
// shader 타입은 vertext shader 또는 fragment shader
const loadShader = (gl: WebGLRenderingContext, type: ShaderLoaderType, source: string): WebGLShader | null => {
  const shader = gl.createShader(type) // shader 객체 생성
  // Only proceed if the shader program was successfully created.
  if (!shader) {
    alert('Failed to initialize shader program. | Creating shader failed')
    return null
  }
  gl.shaderSource(shader, source) // shader source code를 shader 객체에 연결 (Send the source to the shader object)
  gl.compileShader(shader) // shader를 컴파일 (Compile the shader program)

  // 컴파일이 성공했는지 체크한다.
  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader) // 컴파일을 실패한 경우, shader를 삭제
    return null
  }

  return shader // 컴파일 성공한 shader 객체를 반환
}

export default loadShader
