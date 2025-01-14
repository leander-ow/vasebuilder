export function getInputValues() {
    const area = parseFloat(document.getElementById('area').value) || 20;
    const res = parseFloat(document.getElementById('res').value) || 5;
    const steps = parseInt(document.getElementById('steps').value) || 4;
    const inputString = document.getElementById('inputString').value || '0.0055x^3 - 0.18x^2 + 1.5x + 4';
    const wallThickness = parseFloat(document.getElementById('wallThickness').value) || 0.1;
    const floorThickness = parseFloat(document.getElementById('floorThickness').value) || 0.1;

    return { area, res, steps, inputString, wallThickness, floorThickness };
}
