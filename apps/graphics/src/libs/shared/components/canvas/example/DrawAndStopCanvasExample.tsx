import { useState } from 'react'

import Canvas from '../CanvasWithDPR'

const StartAndStopDrawCanvasExample = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => setIsAnimating(true)
  const stopAnimation = () => setIsAnimating(false)

  const draw = (ctx: CanvasRenderingContext2D) => {
    // 그리기 로직
    ctx.fillStyle = 'skyblue'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const animate = (deltaTime: number) => {
    if (!isAnimating) return // 애니메이션 상태가 false이면 함수 실행 중단
    // 애니메이션 로직
    console.log('Animating...', deltaTime)
  }

  return (
    <div>
      <Canvas draw={draw} animate={animate} width={600} height={400} />
      <button onClick={startAnimation}>Start Animation</button>
      <button onClick={stopAnimation}>Stop Animation</button>
    </div>
  )
}

export default StartAndStopDrawCanvasExample
