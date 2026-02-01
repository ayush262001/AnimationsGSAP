import React, { useEffect, useRef } from 'react'
import './App.css'
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shadder';

const App = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const config = {
            lerpFactor: 0.035,
            parallaxStrength: 0.1,
            distortionMultiplier: 10,
            glassStrength: 2.0,
            glassSmoothness: 0.0001,
            stripesFrequency: 35,
            edgePadding: 0.1,
        };

        const container = containerRef.current;
        const imageElement = document.querySelector("#glassTexture");

        if (!container || !imageElement) {
            console.error('Container or image not found');
            return;
        }

        // Wait for image to load before initializing Three.js
        const initThreeJS = () => {
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Remove existing canvas if any
            if (canvasRef.current) {
                container.removeChild(canvasRef.current);
            }
            
            container.appendChild(renderer.domElement);
            canvasRef.current = renderer.domElement;

            const mouse = {x: 0.5, y: 0.5};
            const targetMouse = {x: 0.5, y: 0.5};

            const lerp = (start, end, factor) => start + (end-start)*factor;

            // Load texture from image
            const texture = new THREE.Texture(imageElement);
            texture.needsUpdate = true;
            
            const textureSize = {
                x: imageElement.naturalWidth || imageElement.width,
                y: imageElement.naturalHeight || imageElement.height
            };

            console.log('Texture size:', textureSize);

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture: { value: texture },
                    uResolution: {
                        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
                    },
                    uTextureSize: {
                        value: new THREE.Vector2(textureSize.x, textureSize.y),
                    },
                    uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
                    uParallaxStrength: { value: config.parallaxStrength },
                    uDistortionMultiplier: { value: config.distortionMultiplier },
                    uGlassStrength: { value: config.glassStrength },
                    uStripesFrequency: { value: config.stripesFrequency },
                    uGlassSmoothness: { value: config.glassSmoothness },
                    uEdgePadding: { value: config.edgePadding },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
            });

            const geometry = new THREE.PlaneGeometry(2, 2);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const handleMouseMove = (e) => {
                targetMouse.x = e.clientX / window.innerWidth;
                targetMouse.y = 1.0 - e.clientY / window.innerHeight;
            };

            const handleResize = () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                material.uniforms.uResolution.value.set(
                    window.innerWidth,
                    window.innerHeight
                );
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("resize", handleResize);

            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate);

                mouse.x = lerp(mouse.x, targetMouse.x, config.lerpFactor);
                mouse.y = lerp(mouse.y, targetMouse.y, config.lerpFactor);

                material.uniforms.uMouse.value.set(mouse.x, mouse.y);
                renderer.render(scene, camera);
            };

            animate();

            // Cleanup
            return () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("resize", handleResize);
                if (container && canvasRef.current) {
                    container.removeChild(canvasRef.current);
                }
                geometry.dispose();
                material.dispose();
                texture.dispose();
                renderer.dispose();
            };
        };

        // Check if image is already loaded
        if (imageElement.complete && imageElement.naturalWidth > 0) {
            return initThreeJS();
        } else {
            // Wait for image to load
            imageElement.onload = () => {
                return initThreeJS();
            };
            
            // Fallback: init after a short delay
            const timeoutId = setTimeout(() => {
                if (imageElement.complete) {
                    return initThreeJS();
                }
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    return (
        <>
            <nav>
                <div className="logo">
                    <a href='#'>&#8486; Glassform</a>
                </div>
                <div className="nav-links">
                    <a href='#'>Experimentals</a>
                    <a href='#'>Objects</a>
                    <a href='#'>Exhibits</a>
                </div>
            </nav>

            <section className="hero" ref={containerRef}>
                <img 
                    id='glassTexture' 
                    src="/hero.jpg" 
                    alt="" 
                    crossOrigin="anonymous"
                />
                <div className="hero-content">
                    <h1>Designed for the space between silence and noise</h1>
                    <p>Developed by Ayush Gour</p>
                </div>
            </section>
        </>
    )
}

export default App