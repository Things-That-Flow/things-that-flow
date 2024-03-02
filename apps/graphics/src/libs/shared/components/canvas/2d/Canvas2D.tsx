import React, { forwardRef, useEffect, useRef } from 'react'

interface Props {
  draw: (context: CanvasRenderingContext2D) => void
  animate?: (deltaTime: number) => void
  width?: number
  height?: number
}

const Canvas2D = forwardRef<HTMLCanvasElement, Props>(
  ({ draw, animate, width = window.innerWidth, height = window.innerHeight }, ref) => {
    const internalRef = useRef<HTMLCanvasElement>(null)
    const canvasRef = (ref !== null ? ref : internalRef) as React.MutableRefObject<HTMLCanvasElement>
    const requestRef = useRef<number>()
    const previousTimeRef = useRef<number>()

    useEffect(() => {
      const animateFrame = (time: number) => {
        if (previousTimeRef.current !== undefined && animate) {
          const deltaTime = time - previousTimeRef.current
          animate(deltaTime)
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animateFrame)
      }

      requestRef.current = requestAnimationFrame(animateFrame)
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    }, [animate])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }

      const context = canvas.getContext('2d')

      if (!context) {
        return
      }

      const dpr = window.devicePixelRatio > 1 ? 2 : 1

      const resizeCanvas = () => {
        // sync dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        canvas.width = width * dpr
        canvas.height = height * dpr

        context.scale(dpr, dpr)
        draw(context)
      }

      window.addEventListener('resize', resizeCanvas)
      resizeCanvas()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
      }
    }, [canvasRef, draw, width, height])

    return <canvas ref={canvasRef as React.RefObject<HTMLCanvasElement>} />
  }
)

export default Canvas2D
