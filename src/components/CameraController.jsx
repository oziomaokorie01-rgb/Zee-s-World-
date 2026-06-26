import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Define the camera targets and angles for each workspace district
const cameraTargets = {
  // Global view showing the whole floating island orbiting
  default: { 
    pos: [0, 4, 7], 
    lookAt: [0, 0, 0] 
  },
  
  // Front-Left Node (Your existing box)
  workshop: { 
    pos: [-2.8, 1.5, 3.2], 
    lookAt: [-1.8, 0, 1.2] 
  },
  
  // Front-Right Node (Your existing distorted seed)
  greenhouse: { 
    pos: [2.8, 1.5, -0.2], 
    lookAt: [1.8, -0.1, -1.2] 
  },
  
  // Back-Left Node (Deep tech workspace/research)
  lab: { 
    pos: [-3.2, 1.8, -2.5], 
    lookAt: [-2.0, 0, -1.8] 
  },
  
  // Back-Right Node (Sports/Basketball creative hub)
  court: { 
    pos: [3.2, 1.8, 2.5], 
    lookAt: [2.0, 0, 1.8] 
  },
  
  // Straight dive down looking into the underbelly or the deep background matrix
  void: { 
    pos: [0, 3.5, 0.5], 
    lookAt: [0, -4, 0] 
  }
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
