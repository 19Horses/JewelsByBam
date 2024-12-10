import { useGLTF, Bounds, useBounds, } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { Suspense, useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import * as THREE from "three";
import items from './items.json';
import { Suspense } from "react";
import video from './spiralBowVid.mp4'


Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  material:PropTypes.string,
  isMouseOver: PropTypes.bool,
  zoom: PropTypes.bool
};

FinalModelWithDescriptor.propTypes = {
  description: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  urlName: PropTypes.string,
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

function findArrayElementByTitle(array, urlName) {
  return array.find((element) => {
    return element.urlName === urlName;
  });
}

function findNextArrayItemByID(array, id) {
  return array.find((element) => {
    return element.id === id + 1;
  });
}

function findPrevArrayItemByID(array, id) {
  return array.find((element) => {
    return element.id === id - 1;
  });
}

  function Model(props) {
    const mesh = useRef();
    const vec = new THREE.Vector3();
    const { nodes, materials } = useGLTF(props.src);
    const [dummy] = useState(() => new THREE.Object3D());
    
    useFrame((state, dt) => {
      const step = 0.1;
      state.camera.fov = THREE.MathUtils.lerp(
        state.camera.fov,
        props.zoom ? 30 : 50,
        step
      );
      if (props.isMouseOver) {
        dummy.lookAt(state.pointer.x, state.pointer.y, 1);
      } else {
        dummy.lookAt(0, 0, 1);
      }
      easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt);
    });
  
    return (
        <mesh 
          ref={mesh}
          castShadow
          receiveShadow
          geometry={nodes[props.name].geometry}
          material={nodes[props.name].material}
        >
        </mesh>
    );
  }

  function FinalModelWithDescriptor({ title, src, name, id, material }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [zoom, set] = useState(false);
    return (
      <motion.div
        variants={item}
        onClick={() => { set(true); console.log("clicked!"); }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        className="flex h-full cursor-pointer"
      >
        <Canvas className="model logo h-full" camera={{ position: [0, 10, 3] }}>
          <Bounds fit clip observe margin={1.2}>
              <ambientLight /> 
              <directionalLight position={[10, 10, 10]} /> 
              <Model src={src} material={material} name={name} isMouseOver={isMouseOver} zoom={zoom} />
          </Bounds>
        </Canvas>
      </motion.div>
    );
    if (props.isMouseOver) {
      dummy.lookAt(state.pointer.x, state.pointer.y, 1);
    } else {
      dummy.lookAt(0, 0, 1);
    }
    easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt);
  });

export default function Details() {
    const {urlName} = useParams();
    const [item, setItem] = useState(
        null
    );
    const [clickChecker, setClickChecker] = useState(
      0
    )

export default function Details() {
  const { urlName } = useParams();
  const [item, setItem] = useState(null);
  const [clickChecker, setClickChecker] = useState(0);

  useEffect(() => {
    const selectedItem = findArrayElementByTitle(items, urlName);
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [urlName]);

    return (
      <>
        <div style = {{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <div className=" w-11/12 relative jsonToReact">
              <div className="w-4/5 items-center">
                  <Suspense fallback={null}>
                    {item.src && item.name && (
                      <div onClick={() => {setClickChecker(clickChecker+1); console.log(clickChecker)}}>
                      <FinalModelWithDescriptor
                        key={item.title}
                        title={item.title}
                        name={item.name}
                        material={item.material}
                        grillMaterial={item.grillMaterial}
                        madeFor = {item.madeFor}
                        src={item.src.slice(1)} 
                        
                      />
                      </div>
                    )}
                  </Suspense>
                  
                  <div className="flex justify-center h-full w-full items-center cursor-pointer">
                  
                  </div>
                  
                  
              </div>
               <div className="fixed top-1/2 right-0 w-1/3 transform -translate-y-1/2">
                <p className="uppercase italic text-sm">{item.grillMaterial}</p>
                <section>
                  <div className="scrollDiv ">
                    <p className="uppercase mainFont scrollItem">{item.title}</p>
                    <p className="uppercase mainFont scrollItem">{item.title}</p>
                  </div>
                </section>
                <p className="text-l underline">{item.madeFor}</p>
                <p className="font-bold capitalize text-xl">{item.description}</p>
              </div> 
            
          </div>
        </div>
            <div 
                className="absolute flex justify-between top-1/2 w-[100%] px-5 -z-20"
            >
                    {findPrevArrayItemByID(items, item.id) != undefined &&
                        <Link to={`/details/${findPrevArrayItemByID(items, item.id).urlName}`} >
                                <SlArrowLeft/> 
                        </Link>
                    } 
                    {findNextArrayItemByID(items, item.id) != undefined &&
                        <Link to={`/details/${findNextArrayItemByID(items, item.id).urlName}`} >
                            <SlArrowRight/>
                        </Link> 
                    }
            </div>        
        </>
    );
}
