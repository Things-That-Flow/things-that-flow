import { useEffect, useRef } from 'react'

import { ColorOfCircleType, ProgramInfo, SizeOfCircleType } from '../types'
import { drawCircle } from '../utils/circle'
import { initShaderProgram } from '../utils/init'

interface Props {
  size: Record<SizeOfCircleType, number>
  color: Record<ColorOfCircleType, number>
}

const Circle2DWithWebGL = ({ size, color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec4 uColor;
      void main() {
        gl_FragColor = uColor;
      }
    `

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    if (!shaderProgram) return

    const programInfo: ProgramInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
      },
      uniformLocations: {
        color: gl.getUniformLocation(shaderProgram, 'uColor')
      }
    }

    drawCircle(gl, programInfo, color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} width={size.width} height={size.height} />
}

export default Circle2DWithWebGL
