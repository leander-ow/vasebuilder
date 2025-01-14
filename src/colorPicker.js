import { updateMaterial } from './main.js';

export function setupColorPicker() {
    const colorButton = document.querySelector('.fa-palette');
    const cubeButton = document.querySelector('.fa-cube');
    const colorMenu = document.querySelector('.color-menu');
    let colorMenuOpen = false;
    let wireframeEnabled = false;

    colorButton.addEventListener('click', function() {
        colorMenuOpen = !colorMenuOpen;
        colorMenu.classList.toggle('show', colorMenuOpen);
        colorButton.style.color = colorMenuOpen ? '#999' : '#555';
    });

    cubeButton.addEventListener('click', function() {
        wireframeEnabled = !wireframeEnabled;
        cubeButton.style.color = wireframeEnabled ? '#999' : '#555';
        updateMaterial(undefined, wireframeEnabled);
    });

    const colorElements = document.querySelectorAll('.color');
    colorElements.forEach(color => {
        color.addEventListener('click', () => {
            colorElements.forEach(el => el.classList.remove('selected'));
            color.classList.add('selected');
            updateMaterial(color.classList[1], undefined);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupColorPicker);
