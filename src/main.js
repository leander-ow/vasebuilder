import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { genGeometry } from './genGeometry.js';
import { MathFunction } from './function.js';
import { getInputValues } from './inputHandlers.js';
import { gen2d } from './gen2d.js';

// ThreeJS Application
class ThreeJSApp {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.mesh = null;
        this.color = 0xA96A5B;
        this.wireframe = false;
        this.material = new THREE.MeshMatcapMaterial({
            color: this.color,
            flatShading: true
        });

        this.initRenderer();
        this.initScene();
        this.animate();
    }

    initRenderer() {
        this.container.appendChild(this.renderer.domElement);
        const resizeRenderer = () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        };
        resizeRenderer();
        window.addEventListener('resize', resizeRenderer);
    }

    initScene() {
        this.scene.background = new THREE.Color(0x333333);
        this.camera.position.z = 5;
    }

    updateGeometry(area, res, steps, inputString, wallThickness, floorThickness) {
        const f = new MathFunction(inputString);

        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
        }

        const geometry = genGeometry(area, res, steps, f, wallThickness, floorThickness);

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);

        const boundingBox = new THREE.Box3().setFromObject(this.mesh);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        const distance = Math.max(size.x, size.y, size.z) * 1.2;
        this.camera.position.set(center.x, center.y, center.z + distance);
        this.camera.lookAt(center);

        this.controls.target.set(center.x, center.y, center.z);
        this.controls.update();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Main function to initialize and update the 3D model
export function main(area, res, steps, inputString, wallThickness, floorThickness) {
    if (!window.app) {
        window.app = new ThreeJSApp('threejs-container');
    }
    window.app.updateGeometry(area, res, steps, inputString, wallThickness, floorThickness);
}

// Update material based on user input
export function updateMaterial(colorName = window.app.color, wireframe = window.app.wireframe) {
    switch (colorName) {
        case 'color-clay-1':
            window.app.color = 0xA96A5B;
            break;
        case 'color-clay-2':
            window.app.color = 0x6A7D8C;
            break;
        case 'color-clay-3':
            window.app.color = 0xC4A484;
            break;
        case 'color-clay-4':
            window.app.color = 0x7A8F76;
            break;
        case 'color-clay-5':
            window.app.color = 0xD0836A;
            break;
        case 'color-clay-6':
            window.app.color = 0x8B8C91;
            break;
        case 'color-basic-1':
            window.app.color = 0xFF0000;
            break;
        case 'color-basic-2':
            window.app.color = 0x0000FF;
            break;
        case 'color-basic-3':
            window.app.color = 0xFFFF00;
            break;
        case 'color-basic-4':
            window.app.color = 0x008000;
            break;
        case 'color-basic-5':
            window.app.color = 0xFFA500;
            break;
        case 'color-basic-6':
            window.app.color = 0x800080;
            break;
        case 'color-pastel-1':
            window.app.color = 0xFFC0CB;
            break;
        case 'color-pastel-2':
            window.app.color = 0xADD8E6;
            break;
        case 'color-pastel-3':
            window.app.color = 0xFFFFE0;
            break;
        case 'color-pastel-4':
            window.app.color = 0x90EE90;
            break;
        case 'color-pastel-5':
            window.app.color = 0xFA8072;
            break;
        case 'color-pastel-6':
            window.app.color = 0xEE82EE;
            break;
    }
    window.app.wireframe = wireframe;
    if (window.app) {
        if (wireframe) {
            window.app.material = new THREE.MeshBasicMaterial({
                color: window.app.color,
                wireframe: true
            });
        } else {
            window.app.material = new THREE.MeshMatcapMaterial({
                color: window.app.color,
                flatShading: true
            });
        }
        if (window.app.mesh) {
            window.app.mesh.material = window.app.material;
        }
    }
}

export function getMesh() {
    if (window.app) {
        if (window.app.mesh) {
            return window.app.mesh;
        }
    }
}

// Initialize the vase generation process
export function initMain() {
    const values = getInputValues();
    try {
        gen2d(values.area, values.res, values.inputString, values.wallThickness);
    } catch (error) {
        console.error('Invalid function string!');
        return;
    }
    try {
        main(values.area, values.res, values.steps, values.inputString, values.wallThickness, values.floorThickness, values.color, values.wireframe);
    } catch (error) {
        console.error('Unable to generate vase. Please check your input!', error);
        return;
    }
}

// Event listeners for the form inputs
document.addEventListener('DOMContentLoaded', initMain);

document.querySelectorAll('#dataForm .form-control').forEach(inputField => {
    inputField.addEventListener('input', initMain);
});
