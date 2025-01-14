export function setupInputResetter() {
    document.querySelectorAll('.fa-arrow-rotate-left').forEach(icon => {
        icon.addEventListener('click', function() {
            const inputField = icon.closest('.form-group').querySelector('input');
            if (inputField) {
                switch (inputField.id) {
                    case 'inputString':
                        inputField.value = '0.0055x^3 - 0.18x^2 + 1.5x + 4';
                        break;
                    case 'area':
                        inputField.value = '20';
                        break;
                    case 'wallThickness':
                        inputField.value = '0.1';
                        break;
                    case 'floorThickness':
                        inputField.value = '0.1';
                        break;
                    case 'res':
                        inputField.value = '5';
                        break;
                    case 'steps':
                        inputField.value = '4';
                        break;
                    default:
                        break;
                }
                inputField.dispatchEvent(new Event('input'));
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupInputResetter);