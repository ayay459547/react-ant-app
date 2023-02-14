import React, { useEffect } from 'react'
// import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'
// import CarGLTF from '../models/car/scene.gltf'

const Car: React.FC = () => {
  const CarGLTF = 'models/car/scene.gltf'
  // const gltf = useGLTF('../models/car/scene.gltf', true)

  const gltf = useLoader(
    GLTFLoader,
    CarGLTF
  )
  console.log(CarGLTF)

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005)
    gltf.scene.position.set(0, -0.035, 0)
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.envMapIntensity = 20
      }
    })
  }, [gltf])

  return (
    <primitive object={gltf.scene} />
  )
}

export default Car