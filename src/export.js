import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { getMesh } from './main.js'

export function setupExporter() {
    const downloadButton = document.querySelector('.fa-download');

    downloadButton.addEventListener('click', function() {
        const exporter = new STLExporter();
        const options = { binary: true }

        const mesh = getMesh();
        const geometry = mesh.geometry.clone();

        geometry.scale(10, 10, 10);
        geometry.rotateX(Math.PI / 2);

        const transformedMesh = new THREE.Mesh(geometry, mesh.material);
        const result = exporter.parse(transformedMesh, options);

        const blob = new Blob([result], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vase.stl';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

document.addEventListener('DOMContentLoaded', setupExporter);
