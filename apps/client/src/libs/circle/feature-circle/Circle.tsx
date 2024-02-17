import { useEffect, useRef } from 'react'

interface ProgramInfo {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
  }
  uniformLocations: {
    color: WebGLUniformLocation | null
  }
}

interface Props {
  size: {
    width: number
    height: number
  }
  color: {
    r: number
    g: number
    b: number
    a: number
  }
}

const Circle = ({ size, color }: Props) => {
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

    drawCircle(gl, programInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initShaderProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vertexShader || !fragmentShader) {
      console.error('Creating shader failed')
      return null
    }

    const shaderProgram = gl.createProgram()
    if (!shaderProgram) {
      console.error('Creating shader program failed')
      return null
    }
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ', gl.getProgramInfoLog(shaderProgram))
      return null
    }

    return shaderProgram
  }

  const loadShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type)
    if (!shader) {
      console.error('Creating shader failed')
      return null
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  const drawCircle = (gl: WebGLRenderingContext, programInfo: ProgramInfo) => {
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

  return <canvas ref={canvasRef} width={size.width} height={size.height} />
}

export default Circle
