import React, { useEffect, useRef } from 'react'

interface ProgramInfo {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
  }
}

interface Buffers {
  position: WebGLBuffer
}

const Triangle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl')
      if (gl === null) {
        alert('Unable to initialize WebGL. Your browser may not support it.')
        return
      }

      // Vertex shader program
      const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
          gl_Position = aVertexPosition;
        }
      `

      // Fragment shader program
      const fsSource = `
        void main() {
          gl_FragColor = vec4(${142 / 255}, ${122 / 255}, ${181 / 255} , ${1 / 1} );
        }
      `

      // Initialize a shader program; this is where all the lighting
      // for the vertices and so forth is established.
      const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

      // Only proceed if the shader program was successfully created.
      if (!shaderProgram) {
        alert('Failed to initialize shader program.')
        return
      }

      // Collect all the info needed to use the shader program.
      // Look up which attribute our shader program is using
      // for aVertexPosition and look up uniform locations.
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        }
      }

      // Here's where we call the routine that builds all the
      // objects we'll be drawing.
      const buffers = initBuffers(gl)

      // Draw the scene
      drawScene(gl, programInfo, buffers)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // Draw the scene.
  const drawScene = (gl: WebGLRenderingContext, programInfo: ProgramInfo, buffers: Buffers) => {
    gl.clearColor(0, 0, 0, 0) // Clear to transparent, fully opaque
    gl.clearDepth(1.0) // Clear everything
    gl.enable(gl.DEPTH_TEST) // Enable depth testing
    gl.depthFunc(gl.LEQUAL) // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 3 // pull out 3 values per iteration
      const type = gl.FLOAT // the data in the buffer is 32bit floats
      const normalize = false // don't normalize
      const stride = 0 // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0 // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset)
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
    }

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program)

    {
      const offset = 0
      const vertexCount = 3
      gl.drawArrays(gl.TRIANGLES, offset, vertexCount)
    }
  }

  // Creates a shader program, so WebGL knows how to draw our data
  const initShaderProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

    // Create the shader program
    const shaderProgram = gl.createProgram()

    // Only proceed if the shader program was successfully created.
    if (!shaderProgram || !vertexShader || !fragmentShader) {
      alert('Failed to initialize shader program.')
      return
    }

    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
      return null
    }

    return shaderProgram
  }

  // Creates a shader of the given type, uploads the source and
  // compiles it.
  const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)

    // Only proceed if the shader program was successfully created.
    if (!shader) {
      alert('Failed to initialize shader program.')
      return
    }

    // Send the source to the shader object
    gl.shaderSource(shader, source)

    // Compile the shader program
    gl.compileShader(shader)

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  return <canvas ref={canvasRef} width="240" height="240" />
}

export default Triangle
