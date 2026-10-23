"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

function Bottle({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => { pointer.current = { x: event.clientX / innerWidth - .5, y: event.clientY / innerHeight - .5 }; };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.current;
    const compact = state.viewport.width < 6;
    const desktopX = p < .2
      ? 1.65
      : p < .6
        ? THREE.MathUtils.lerp(1.65, -1.75, THREE.MathUtils.smoothstep(p, .2, .43))
        : THREE.MathUtils.lerp(-1.75, 1.75, THREE.MathUtils.smoothstep(p, .6, .82));
    const targetX = compact ? 0 : desktopX;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX + pointer.current.x * .08, 4.2, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(p * Math.PI * 2) * .32 + pointer.current.y * -.12, 3.5, delta);
    group.current.rotation.y += delta * (.18 + p * .35);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -.12 + p * .85 + pointer.current.y * .25, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -.1 + Math.sin(p * Math.PI) * .35, 3, delta);
    const s = compact ? .72 : .76 + Math.sin(p * Math.PI) * .05;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 3, delta));
  });

  return <Float speed={1.2} rotationIntensity={.08} floatIntensity={.18}>
    <group ref={group} rotation={[0, -.35, -.08]}>
      <RoundedBox args={[1.18, 2.4, .66]} radius={.22} smoothness={6} position={[0, -.15, 0]} castShadow>
        <meshPhysicalMaterial color="#c8888b" transmission={.76} thickness={.55} roughness={.12} metalness={0} transparent opacity={.9} ior={1.43} />
      </RoundedBox>
      <mesh position={[0, .02, .345]}>
        <planeGeometry args={[.76, 1.12]}/><meshStandardMaterial color="#f4e8dd" roughness={.62}/>
      </mesh>
      <mesh position={[0, .14, .355]}><planeGeometry args={[.48, .38]}/><meshStandardMaterial color="#302825"/></mesh>
      <mesh position={[0, .14, .36]}><planeGeometry args={[.39, .29]}/><meshStandardMaterial color="#efe1d6"/></mesh>
      <mesh position={[0, 1.2, 0]} castShadow><cylinderGeometry args={[.42, .46, .42, 48]}/><meshStandardMaterial color="#b68a60" metalness={.82} roughness={.18}/></mesh>
      <mesh position={[0, 1.78, 0]} castShadow><cylinderGeometry args={[.27, .36, .82, 48]}/><meshPhysicalMaterial color="#f1e7df" roughness={.28}/></mesh>
      <mesh position={[0, -1.32, 0]}><cylinderGeometry args={[.45, .49, .08, 48]}/><meshStandardMaterial color="#714b48" metalness={.2} roughness={.28}/></mesh>
      <mesh position={[0, -.06, .367]}><planeGeometry args={[.6, .015]}/><meshStandardMaterial color="#a87d68"/></mesh>
    </group>
  </Float>;
}

export function SerumStory() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [webglReady, setWebglReady] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", scrub: true, onUpdate: (self) => { progress.current = self.progress; } });
      gsap.utils.toArray<HTMLElement>(".story-copy", root.current).forEach((item) => gsap.fromTo(item, { opacity: .15, y: 50 }, { opacity: 1, y: 0, scrollTrigger: { trigger: item, start: "top 78%", end: "top 38%", scrub: true } }));
      return () => trigger.kill();
    });
    return () => media.revert();
  }, []);

  return <section className="serum-story" ref={root}>
    <div className="story-sticky">
      <div className={`webgl-fallback ${webglReady ? "hidden" : ""}`} aria-hidden="true"><div className="fallback-bottle"><span/><b>2b<small>SHINE</small></b></div></div>
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 7.2], fov: 33 }} gl={{ antialias: true, alpha: true }} onCreated={() => setWebglReady(true)}>
        <ambientLight intensity={1.3}/><directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff2e7" castShadow/><pointLight position={[-4, 1, 3]} intensity={2.4} color="#e7a5a8"/>
        <Bottle progress={progress}/><ContactShadows position={[0, -1.75, 0]} opacity={.28} scale={7} blur={2.8} far={3}/><Environment preset="studio"/>
      </Canvas>
      <div className="story-index">01 — 03</div>
      <div className="story-brand">2b <i>shine</i></div>
    </div>
    <div className="story-panels">
      <div className="story-copy first"><span className="eyebrow">Meet your ritual</span><h1>Rawat cahaya<br/><i>alami kulitmu.</i></h1><p>Perawatan yang terasa personal, produk yang dirancang sebagai jeda, dan ruang yang membuat Anda bernapas lebih pelan.</p><a href="#discover" className="text-link">Mulai perjalanan <span>↘</span></a></div>
      <div className="story-copy second"><span className="eyebrow">The sensorial layer</span><h2>Ringan pada kulit.<br/><i>Kaya dalam ritual.</i></h2><p>Visualisasi produk ini adalah objek 3D nyata—kaca, metal, label, cahaya, dan geraknya dirender langsung di browser.</p></div>
      <div className="story-copy third"><span className="eyebrow">Made for pause</span><h2>Satu tetes.<br/><i>Satu momen tenang.</i></h2><p>Sebuah kampanye interaktif untuk memperkenalkan pengalaman 2bshine, dari layar hingga ruang perawatan.</p><Link href="/products/embun-barrier-serum" className="button dark">Kenali Embun Serum</Link></div>
    </div>
  </section>;
}
