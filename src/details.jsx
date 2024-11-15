import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";
import * as THREE from "three";
import items from "./items.json";

Model.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  material: PropTypes.string,
  isMouseOver: PropTypes.bool,
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
  const { nodes, materials } = useGLTF(props.src);
  const [dummy] = useState(() => new THREE.Object3D());

  useFrame((state, dt) => {
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
      material={materials[props.material]}
    ></mesh>
  );
}

function FinalModelWithDescriptor({ src, name, material }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="flex h-full cursor-pointer"
    >
      <Canvas className="model logo h-full" camera={{ position: [0, 0.1, 3] }}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model
          src={src}
          material={material}
          name={name}
          isMouseOver={isMouseOver}
        />
      </Canvas>
    </motion.div>
  );
}

export default function Details() {
  const { urlName } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const selectedItem = findArrayElementByTitle(items, urlName);
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [urlName]);

  if (!item) {
    return <p>hello</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div className=" w-11/12 grid grid-cols-3 jsonToReact">
          <div>
            {item.instagramVideo && (
              <InstagramEmbed url={item.instagramVideo} width={328} />
            )}
          </div>
          <div>
            {item.src && item.name && (
              <FinalModelWithDescriptor
                key={item.title}
                title={item.title}
                name={item.name}
                material={item.material}
                src={item.src}
              />
            )}
          </div>
          <div>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-between top-1/2 w-[100%] px-5">
        {findPrevArrayItemByID(items, item.id) != undefined && (
          <Link
            to={`/details/${findPrevArrayItemByID(items, item.id).urlName}`}
          >
            PREV
          </Link>
        )}
        {findNextArrayItemByID(items, item.id) != undefined && (
          <Link
            to={`/details/${findNextArrayItemByID(items, item.id).urlName}`}
          >
            NEXT
          </Link>
        )}
      </div>
    </>
  );
}
