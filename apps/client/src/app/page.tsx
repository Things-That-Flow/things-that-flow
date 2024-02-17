import Circle from '@/libs/circle/feature-circle/Circle'

const Page = () => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Circle
        circleColor={{
          r: 142,
          g: 122,
          b: 181,
          a: 1
        }}
      />
      <p
        style={{
          position: 'absolute',
          color: 'white',
          fontSize: '13px'
        }}
      >
        Welcome, Things That Flow World!!
      </p>
    </div>
  )
}

export default Page
