import { useEffect, useRef } from 'react'

import { ColorParamWithOthers } from '../types/color'
import { Program } from '../types/program'
import drawCircle from '../utils/draw-circle'
import { initShaderProgram } from '../utils/init-program'

type Props = unknown

const useDrawCircle = ({ color }: ColorParamWithOthers<Props>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // canvas로부터 webgl graphic context를 가져온다.
    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // vertex shader : 정점 위치 결정하는 shader
    // attribute 변수 정의 후 => gl_Position에 할당해, 정점 위치를 webgl에게 전달한다.
    // gl_Position는 클립 공간 좌표로, 렌더링 파이프 라인 다음 단계에서 사용한다.
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `

    // fragment shader : pixel(or fragment)의 색상을 계산하는 shader
    // vertext shader에 의해 결정된 폴리곤 내 각 픽셀에 대해 실행한다.
    // uniform 변수인 uColor를 사용해서 외부로부터 색상을 전달 받는다.
    // precision mediump float를 사용해 fragment shader에서 사용할 부동소수점 정밀도 지정한다. (mediump는 중간 정밀도를 의미, 평균 성능과 평균 정밀도를 지정)
    // gl_FragColor에 uColor를 할당해서 => 현재 fragment(pixel)의 최종 색상 결정한다.
    const fsSource = `
      precision mediump float;
      uniform vec4 uColor;
      void main() {
        gl_FragColor = uColor;
      }
    `

    // shader 객체를 생성하고, shader 프로그램에 객체를 attach => webgl context에 해당 프로그램을 link까지 진행한다.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    if (!shaderProgram) return

    // shader 프로그램 정보를 정의한다.
    const programObject: Program = {
      program: shaderProgram,
      // 위에서 shader source code를 통해 할당한 변수들(aVertexPosition, uColor)을 지정한다.
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
      },
      uniformLocations: {
        color: gl.getUniformLocation(shaderProgram, 'uColor')
      }
    }

    drawCircle(gl, programObject, color) // webgl을 사용해 2d 원을 그리는 함수를 실행한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref: canvasRef }
}

export default useDrawCircle
