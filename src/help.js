import { updateMaterial } from './main.js';

export function setupHelpButton() {
    const helpButton = document.querySelector('.fa-circle-question');

    helpButton.addEventListener('click', function() {
        const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
        infoModal.show();
    });
}

document.addEventListener('DOMContentLoaded', setupHelpButton);
