/**
 * Application entry point
 */
import 'styles/index.scss';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1,
    1000,
);

camera.position.set(15, 50, 0); // x y z camera coords
camera.lookAt(new THREE.Vector3(0,15,0));

const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);
document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 5, 5, 5, 5 ),
    new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
);
plane.rotateX(Math.PI/2);
scene.add( plane );

// lighting
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 2 );
pointLight.position.set( 50, 50, 50 );
scene.add( pointLight );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

// add shapes here!!!!



// end shapes

renderer.render(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0,15,0);
controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
