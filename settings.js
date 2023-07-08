function myPreset1() {
    resetForm();
    document.getElementById('luminosity').value = 95;
    document.getElementById('invert').value = 100;
    document.getElementsByClassName("mask").item(0) === null && MASK();
    triggerChange();
}

function myPreset2() {
    resetForm();
    document.getElementById('luminosity').value = 90;
    document.getElementById('invert').value = 100;
    triggerChange();
}

function myPreset3() {
    resetForm();
    document.getElementById('luminosity').value = 70;
    document.getElementById('invert').value = 90;
    triggerChange();
}

function myPreset4() {
    resetForm();
    document.getElementById('distance').value = 100;
    triggerChange();
}

function resetForm() {
    resetDefaultValues();
    triggerChange();
    document.getElementsByClassName("mask").item(0) !== null && MASK();
}

function resetDefaultValues() {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].defaultValue
    }
}

function triggerChange() {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].dispatchEvent(new Event('change'));
    }
}

function MASK() {
    document.getElementById('mask').classList.toggle('active');
    document.getElementsByClassName("card__shine").item(0)?.classList.toggle('mask');
}

function changeStyle(property, value) {
    document.getElementById("card").style.setProperty(`--${property}`, value)
}

function changeRotationLevel(level) {
    rotationLevel = level;
}