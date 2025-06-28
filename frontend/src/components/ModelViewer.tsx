'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

type Props = {
    url: string;
};

export default function ModelViewer({ url }: Props) {
    const [scene, setScene] = useState<THREE.Object3D | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ext = url.split('.').pop()?.toLowerCase();

        const loadModel = async () => {
            try {
                if (ext === 'glb' || ext === 'gltf') {
                    const loader = new GLTFLoader();
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath('/draco/'); // DRACO decoder folder
                    loader.setDRACOLoader(dracoLoader);

                    loader.load(
                        url,
                        (gltf) => {
                            setScene(gltf.scene);
                            dracoLoader.dispose();
                        },
                        undefined,
                        (err) => {
                            console.error('Error loading GLB/GLTF:', err);
                        }
                    );
                } else if (ext === 'fbx') {
                    const loader = new FBXLoader();
                    loader.load(
                        url,
                        (fbx) => setScene(fbx),
                        undefined,
                        (err) => {
                            console.error('Error loading FBX:', err);
                        }
                    );
                } else {
                    console.error('Unsupported file format:', ext);
                }
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();
    }, [url]);

    if (!scene) return <p className="text-center">Loading 3D model...</p>;

    return (
        <div className="relative w-full h-[500px]" ref={containerRef}>
            <Canvas camera={{ position: [0, 2, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <primitive object={scene} />
                <OrbitControls />
            </Canvas>
            <div className="absolute top-2 right-2 bg-white/90 text-sm text-gray-700 rounded p-2 shadow z-10">
                <p className="font-semibold">Controls:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                    <li><strong>Rotate:</strong> Left-click + drag</li>
                    <li><strong>Zoom:</strong> Mouse scroll</li>
                    <li><strong>Pan:</strong> Right-click + drag</li>
                </ul>
            </div>
        </div>
    );
}
