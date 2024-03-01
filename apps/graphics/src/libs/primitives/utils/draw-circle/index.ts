import { ColorType } from '../../types/color'
import { Program } from '../../types/program'

const drawCircle = (gl: WebGLRenderingContext, programObject: Program, color: ColorType) => {
  // 여기서 buffer는 원의 정점 데이터를 저장하는 목적이다.
  const positionBuffer = gl.createBuffer() // 새로운 buffer를 생성한다.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer) // 생성한 buffer를 현재 배열 buffer로 바인딩 처리한다.

  // 원 정점을 계산한다.
  const positions: number[] = [] // 원 좌표를 배열에 담아서 관리한다.
  const numSegments = 100 // 원을 몇 개의 세그먼트로 나눌지 결정
  const circleRadius = 0.5 // 원의 반지름
  for (let i = 0; i < numSegments; i++) {
    // theta를 통해 원 경계의 정점 y,x 좌표를 생성한다.
    // theta란, 원의 중심을 기준으로 한 해당 정점까지의 각도(라디안 단위)를 의미한다.
    const theta = (i / numSegments) * 2 * Math.PI
    // x좌표 : Math.cos(theta) * circleRadius (x = r * cos(theta))
    // y좌표 : Math.sin(theta) * circleRadius (y = r * sin(theta))
    // z좌표 : 0
    positions.push(Math.cos(theta) * circleRadius, Math.sin(theta) * circleRadius, 0)
  }

  // 계산된 정점 위치들(positions)를 Float32Array로 변환한다.
  // bufferData를 사용해서 현재 바인딩된 버퍼에 정점 데이터를 저장한다.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  gl.useProgram(programObject.program) // shader 프로그램을 사용한다.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer) // 현재 버퍼에 정점 위치의 buffer를 바인딩한다.
  gl.vertexAttribPointer(programObject.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0) // shader의 정점 위치 속성(attribute)에 버퍼 데이터 연결
  gl.enableVertexAttribArray(programObject.attribLocations.vertexPosition) // 해당 속성 활성화

  if (programObject.uniformLocations.color) {
    // 색상 존재하면, shader 프로그램의 색상 uniform에 원의 색상을 설정한다.
    // 색상 값은 [0, 1] 범위로 정규화해서 전달한다.
    gl.uniform4f(programObject.uniformLocations.color, color.r / 255, color.g / 255, color.b / 255, color.a / 1.0)
  }

  // 원을 그린다.
  // gl.TRIANGLE_FAN 모드를 사용해서 원의 정점들을 연결한다.
  gl.drawArrays(gl.TRIANGLE_FAN, 0, numSegments)
}

export default drawCircle
