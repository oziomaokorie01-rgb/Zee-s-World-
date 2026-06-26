import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Define the camera targets and angles for each workspace district
const cameraTargets = {
  default: { pos: [0, 4, 7], lookAt: [0, 0, 0] },
  workshop: { pos: [-3, 2, 4], lookAt: [-1.8, 0, 1.2] },
  greenhouse: { pos: [3, 2, -2], lookAt: [1.8, -0.1, -1.2] },
};

// Internal tracking vector created once outside the loop to preserve memory
const currentLookAt = new THREE.Vector3(0, 0, 0);

export default function CameraController({ activeDistrict }) {
  const { camera } = useThree();
  
  const targetKey = activeDistrict && cameraTargets[activeDistrict] ? activeDistrict : 'default';
  const targetPos = new THREE.Vector3(...cameraTargets[targetKey].pos);
  const targetLook = new THREE.Vector3(...cameraTargets[targetKey].lookAt);

  useFrame(() => {
    // Smoothly interpolate camera position (0.05 handles the transition speed)
    camera.position.lerp(targetPos, 0.05);

    // Smoothly interpolate where the lens is looking
    currentLookAt.lerp(targetLook, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}
