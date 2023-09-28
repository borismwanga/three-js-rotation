import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const delay = props.delay || 0

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // Check the delay variable before rotating the box
    if (state.clock.elapsedTime >= delay) {
      ref.current.rotation.x += delta * 10
    }
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[0.5, 2, 0.5]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'red'} />
      <Edges />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-7.6, 0, 0]} delay={0.1} />
      <Box position={[-6.2, 0, 0]} delay={0.2} />
      <Box position={[-5, 0, 0]} delay={0.3} />
      <Box position={[-4.8, 0, 0]} delay={0.4} />
      <Box position={[-3.6, 0, 0]} delay={0.5} />
      <Box position={[-2.4, 0, 0]} delay={0.6} />
      <Box position={[-1.2, 0, 0]} delay={0.7} />
      <Box position={[0, 0, 0]} delay={0.8} />
      <Box position={[1.2, 0, 0]} delay={0.9} />
      <Box position={[2.4, 0, 0]} delay={1} />
      <Box position={[3.6, 0, 0]} delay={1.2} />
      <Box position={[4.8, 0, 0]} delay={1.3} />
      <Box position={[5, 0, 0]} delay={1.4} />
      <Box position={[6.2, 0, 0]} delay={1.5} />
      <Box position={[7.6, 0, 0]} delay={1.6} />
      <OrbitControls />
    </Canvas>
  )
}
