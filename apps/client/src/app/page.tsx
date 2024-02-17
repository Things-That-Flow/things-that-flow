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
        size={{
          width: 480,
          height: 480
        }}
        color={{
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
