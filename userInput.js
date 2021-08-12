let keyboardSensitivity = 0.03;
let mouseSensitivity = 0.03;

let defaultCameraPosition = [0.8, 0.5, 2];

let gridEnabled = false;
let isProjectionOrthogonal = false;
let selectedShaderProgram = 2;


function rotateCamera(axisVector, clockwise) {
    let translation = vec3.create();
    let translationInverse = vec3.create();
    let translationMatrix = mat4.create();
    let translationInverseMatrix = mat4.create();
    let rotationMatrix = mat4.create();
    let radian = clockwise ? -keyboardSensitivity : keyboardSensitivity;

    mat4.getTranslation(translation, viewMatrix);
    vec3.negate(translationInverse, translation);

    mat4.fromTranslation(translationMatrix, translation);
    mat4.fromTranslation(translationInverseMatrix, translationInverse);
    mat4.fromRotation(rotationMatrix, radian, axisVector);

    let transformation = mat4.create();
    mat4.multiply(transformation, rotationMatrix, translationInverseMatrix);
    mat4.multiply(transformation, translationMatrix, transformation);

    mat4.multiply(viewMatrix, transformation, viewMatrix);
}

function initEventListeners() {
    let mouseXCoord = 0;
    let transformation = mat4.create();

    // Keyboard
    document.addEventListener('keydown', (event) => {

        switch(event.key) {
            // ### Game Settings ###
            case 'p':
                if(!isGameOver) {
                    isGamePaused = !isGamePaused;

                    if(isGamePaused) {
                        deltaTime = performance.now() - last;
                    }
                    else {
                        last = performance.now() - deltaTime;
                    }
                }
                break;
            case 'f':
                selectedShaderProgram = selectedShaderProgram === 1 ? 2 : 1;
                switchShaderProgram(selectedShaderProgram);
                break;
            case 'g':
                gridEnabled = !gridEnabled;
                break;
            case 'v':
                isProjectionOrthogonal = !isProjectionOrthogonal;
                break;

            // ### Camera Controls ###
            case '+':
                if(!isProjectionOrthogonal && !isGamePaused) {
                    mat4.fromTranslation(transformation, [0, 0, keyboardSensitivity]);
                    mat4.multiply(viewMatrix, transformation, viewMatrix);
                }
                break;
            case '-':
                if(!isProjectionOrthogonal && !isGamePaused) {
                    mat4.fromTranslation(transformation, [0, 0, -keyboardSensitivity]);
                    mat4.multiply(viewMatrix, transformation, viewMatrix);
                }
                break;
            case 'j':
                if(!isGamePaused) {
                    rotateCamera([0, 1, 0], false);
                }

                //mat4.fromYRotation(transformation, keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;
            case 'l':
                if(!isGamePaused) {
                    rotateCamera([0, 1, 0], true);
                }

                //mat4.fromYRotation(transformation, -keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;
            case 'i':
                if(!isGamePaused) {
                    rotateCamera([1, 0, 0], false);
                }

                //mat4.fromXRotation(transformation, keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;
            case 'k':
                if(!isGamePaused) {
                    rotateCamera([1, 0, 0], true);
                }

                //mat4.fromXRotation(transformation, -keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;
            case 'u':
                if(!isGamePaused) {
                    rotateCamera([0, 0, 1], false);
                }

                //mat4.fromZRotation(transformation, keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;
            case 'o':
                if(!isGamePaused) {
                    rotateCamera([0, 0, 1], true);
                }

                //mat4.fromZRotation(transformation, -keyboardSensitivity);
                //mat4.multiply(viewMatrix, viewMatrix, transformation);
                break;


            // ### Transformation of current Tetracube ###
            // Translations
            case ' ':
                if(!isGamePaused && !isGameOver) {
                    while(checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 1, 0], true, false)) {
                        tetracubes[currentTetracubeIndex].translate([0, 1, 0], false, cubeSideLength);
                    }
                }
                break;
            case `ArrowUp`:
            case 'w':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 0, 1], true, false)) {
                    tetracubes[currentTetracubeIndex].translate([0, 0, 1], false, cubeSideLength);
                }
                break;
            case `ArrowDown`:
            case 's':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 0, 1], true, true)) {
                    tetracubes[currentTetracubeIndex].translate([0, 0, 1], true, cubeSideLength);
                }
                break;
            case `ArrowLeft`:
            case 'a':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [1, 0, 0], true, false)) {
                    tetracubes[currentTetracubeIndex].translate([1, 0, 0], false, cubeSideLength);
                }
                break;
            case `ArrowRight`:
            case 'd':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [1, 0, 0], true, true)) {
                    tetracubes[currentTetracubeIndex].translate([1, 0, 0], true, cubeSideLength);
                }
                break;

            // Rotations
            case 'x':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [1, 0, 0], false, false)) {
                    tetracubes[currentTetracubeIndex].rotate([1, 0, 0], false);
                }
                break;
            case 'X':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [1, 0, 0], false, true)) {
                    tetracubes[currentTetracubeIndex].rotate([1, 0, 0], true);
                }
                break;
            case 'y':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 1, 0], false, false)) {
                    tetracubes[currentTetracubeIndex].rotate([0, 1, 0], false);
                }
                break;
            case 'Y':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 1, 0], false, true)) {
                    tetracubes[currentTetracubeIndex].rotate([0, 1, 0], true);
                }
                break;
            case 'z':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 0, 1], false, false)) {
                    tetracubes[currentTetracubeIndex].rotate([0, 0, 1], false);
                }
                break;
            case 'Z':
                if(!isGamePaused && !isGameOver
                    && checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 0, 1], false, true)) {
                    tetracubes[currentTetracubeIndex].rotate([0, 0, 1], true);
                }
                break;
        }
    });

    // Mouse
    canvas.addEventListener('mousemove', (e) => {
        if(!isGamePaused && mouseXCoord !== 0) {
            let translation = vec3.create();
            let translationInverse = vec3.create();
            let translationMatrix = mat4.create();
            let translationInverseMatrix = mat4.create();
            let rotationMatrix = mat4.create();

            // Calculate the difference of the X coordinates
            let radian = (mouseXCoord - e.offsetX) * mouseSensitivity;

            mat4.getTranslation(translation, viewMatrix);
            vec3.negate(translationInverse, translation);

            mat4.fromTranslation(translationMatrix, translation);
            mat4.fromTranslation(translationInverseMatrix, translationInverse);
            mat4.fromYRotation(rotationMatrix, radian);

            let transformation = mat4.create();
            mat4.multiply(transformation, rotationMatrix, translationInverseMatrix);
            mat4.multiply(transformation, translationMatrix, transformation);

            mat4.multiply(viewMatrix, transformation, viewMatrix);
        }

        // Set current X and Y coordinates
        mouseXCoord = e.offsetX;
    });
}