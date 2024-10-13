import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { easing } from 'maath'

function Suzanne(props) {
    const mesh = useRef()
    const { nodes } = useGLTF('./suzanne.glb')
    const [dummy] = useState(() => new THREE.Object3D())
    useFrame((state, dt) => {
      dummy.lookAt(state.pointer.x, state.pointer.y, 1)
      easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt)
    })
    return (
      <mesh ref={mesh} geometry={nodes.Suzanne.geometry} {...props}>
        <meshNormalMaterial />
      </mesh>
    )
  }

  function FinalSuzanne(){
    return(
    <Canvas camera={{ position: [0, 0.1, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Suzanne />
      </Canvas>
    )
  }
  
  export default function Gallery() {
    return (
        <>
            <div className='grid grid-cols-4 grid-rows-2'>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
                <FinalSuzanne/>
            </div>
        </>
    )
  }