import React, { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'
// import CarGLTF from '../models/car/scene.gltf'

const Car: React.FC = () => {
  const gltf = useLoader(
    GLTFLoader,
    '../models/car/scene.gltf'
  )

  return (
    <div></div>
  )
}

export default Car