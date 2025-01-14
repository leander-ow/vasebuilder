import * as THREE from 'three';

export function genGeometry(area, res, steps, f, wallThickness, floorThickness, scene) {
    const vertices = [];
    const indices = [];

    const degToRad = Math.PI / 180;

    for (let wall = 0; wall < 2; wall++) {
        const initialVerticesLength = vertices.length / 3;

        for (let i = 0; i < area * res; i++) {
            const y = i / res + (wall === 1 && i === 0 ? floorThickness : 0);
            if (wall === 1 && i <= floorThickness && i !== 0) continue;

            for (let j = 0; j < steps; j++) {
                const angle = j * (360 / steps) * degToRad;
                const vectorB = calculateVectorB(f.evaluate(y) - wall * wallThickness, angle);

                vertices.push(vectorB[0], y, vectorB[1]);

                if (i > 0) {
                    const currentIndex = initialVerticesLength + i * steps + j;
                    const previousRowCurrentIndex = initialVerticesLength + (i - 1) * steps + j;
                    const previousRowNextIndex = initialVerticesLength + (i - 1) * steps + (j + 1) % steps;
                    const nextIndex = initialVerticesLength + i * steps + (j + 1) % steps;

                    if (wall) {
                        indices.push(currentIndex, previousRowCurrentIndex, previousRowNextIndex);
                        indices.push(currentIndex, previousRowNextIndex, nextIndex);
                    } else {
                        indices.push(currentIndex, previousRowNextIndex, previousRowCurrentIndex);
                        indices.push(currentIndex, nextIndex, previousRowNextIndex);
                    }
                }
            }
        }
        let i = area * res;
        for (let j = 0; j < steps; j++) {
            const y = i / res + (wall === 1 && i === 0 ? floorThickness : 0);

            const angle = j * (360 / steps) * degToRad;
            const vectorB = calculateVectorB(f.evaluate(y) - wall * wallThickness, angle);

            vertices.push(vectorB[0], y, vectorB[1]);

            if (i > 0) {
                const currentIndex = initialVerticesLength + i * steps + j;
                const previousRowCurrentIndex = initialVerticesLength + (i - 1) * steps + j;
                const previousRowNextIndex = initialVerticesLength + (i - 1) * steps + (j + 1) % steps;
                const nextIndex = initialVerticesLength + i * steps + (j + 1) % steps;

                if (wall) {
                    indices.push(currentIndex, previousRowCurrentIndex, previousRowNextIndex);
                    indices.push(currentIndex, previousRowNextIndex, nextIndex);
                } else {
                    indices.push(currentIndex, previousRowNextIndex, previousRowCurrentIndex);
                    indices.push(currentIndex, nextIndex, previousRowNextIndex);
                }
            }
        }

        const bottomCenterIndex = vertices.length / 3;
        vertices.push(0, wall * floorThickness, 0);

        for (let j = 0; j < steps; j++) {
            const currentIndex = initialVerticesLength + j;
            const nextIndex = initialVerticesLength + (j + 1) % steps;

            if (wall) {
                indices.push(bottomCenterIndex, nextIndex, currentIndex);
            } else {
                indices.push(bottomCenterIndex, currentIndex, nextIndex);
            }
        }
    }

    const innerVerticesIndex = (vertices.length / 3) - steps - 1;
    const outerVerticesIndex = innerVerticesIndex - (area * res * steps) - steps - 1;

    for (let j = 0; j < steps; j++) {
        const currentInnerIndex = outerVerticesIndex + j;
        const currentOuterIndex = innerVerticesIndex + j;
        const nextInnerIndex = outerVerticesIndex + ((j + 1) % steps);
        const nextOuterIndex = innerVerticesIndex + ((j + 1) % steps);

        indices.push(currentInnerIndex, currentOuterIndex, nextInnerIndex);
        indices.push(currentOuterIndex, nextOuterIndex, nextInnerIndex);
    }

    const verticesArray = new Float32Array(vertices);
    const indicesArray = new Uint32Array(indices);

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesArray, 1));

    return geometry;
}

function calculateVectorB(vectorA, alpha) {
    const cosA = Math.cos(alpha);
    const sinA = Math.sin(alpha);

    return [cosA * vectorA, sinA * vectorA];
}
