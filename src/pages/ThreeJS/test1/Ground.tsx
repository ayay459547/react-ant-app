import React, { useEffect } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three'
// import RoughnessImg from './textures/slab_tiles_disp_4k.png'
// import NormalImg from './textures/slab_tiles_diff_4k.jpg'
import RoughnessImg from '../models/background/terrain-roughness.jpg'
import NormalImg from '../models/background/terrain-normal.jpg'

const Ground: React.FC = () => {
  const [ roughness, normal ] = useLoader(TextureLoader, [
    RoughnessImg,
    NormalImg
  ])

  useEffect(() => {
    [normal, roughness].forEach(t => {
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.set(5, 5)
    })

    normal.encoding = LinearEncoding
  }, [roughness, normal])

  return (
    <>
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]}/>
        <meshBasicMaterial color={'red'}/>
      </mesh> */}
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[30, 30]}/>
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          // normalScale={undefined}
          // normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          dithering={true}
          color={[0.015, 0.015, 0.015]}
          roughness={0.7}
          blur={[1000, 400]}
          mixBlur={30}
          mixStrength={80} 
          mixContrast={1} 
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          // debug={0}
          reflectorOffset={0.2}
        />
      </mesh>
    </>
  )
}

export default Ground