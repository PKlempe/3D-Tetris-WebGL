let currentTetracubeIndex = -1;
let cubeSideLength = 0.15;

let isGamePaused = false;
let isGameOver = false;

let collisionMap = new Map();

let gameRefreshTime = 1000;     // In Milliseconds
let now;
let last = performance.now();
let deltaTime = 0;

let tetracubeTypes = [
    () => new ShapeI(),
    () => new ShapeL(),
    () => new ShapeN(),
    () => new ShapeO(),
    () => new ShapeT(),
    () => new ShapeTowerLeft(),
    () => new ShapeTowerRight(),
    () => new ShapeTripod(),
];


function initGame() {
    // Initialize Collision Map
    for(let y = -825; y <= 825; y += 150) {
        for(let z = -225; z <= 225; z += 150) {
            for(let x = -225; x <= 225; x += 150) {
                collisionMap.set(`${x/1000}|${y/1000}|${z/1000}`, true);
            }
        }
    }

    // Initialize Playing Field
    boundingBox = new BoundingBox();
    grid3D = new Grid3D();

    // Place first Tetracube
    placeRandomTetracube();
}


function progressGame() {
    if(!isGamePaused && !isGameOver) {
        now = performance.now();
        deltaTime = now - last;

        if (deltaTime >= gameRefreshTime) {
            last = now;

            if(checkIfTransformationIsPossible(tetracubes[currentTetracubeIndex], [0, 1, 0], true, false)) {
                tetracubes[currentTetracubeIndex].translate([0, 1, 0], false, cubeSideLength);
            }
            else {
                changeFieldStates(tetracubes[currentTetracubeIndex], false);
                removePlaneIfNecessary();

                if(!checkIfGameOver()) {
                    placeRandomTetracube();
                }
            }
        }
    }
}


function placeRandomTetracube() {
    // Randomly choose a Tetracube Type
    let tetracube = tetracubeTypes[Math.floor(Math.random() * tetracubeTypes.length)]();
    mat4.scale(tetracube.modelMatrix, tetracube.modelMatrix, [0.075, 0.075, 0.075]);

    // Translate the Tetracube to its Start Position
    let translation = mat4.create();
    if(tetracube instanceof ShapeO || tetracube instanceof ShapeTowerLeft || tetracube instanceof ShapeTowerRight) {
        mat4.fromTranslation(translation, [0, 1.05, 0]);
    }
    else if(tetracube instanceof ShapeI) {
        mat4.fromTranslation(translation, [0, 0.9, 0]);
    }
    else {
        mat4.fromTranslation(translation, [-0.075, 0.975, -0.075]);
    }
    mat4.multiply(tetracube.modelMatrix, translation, tetracube.modelMatrix);

    // Add the Tetracube to the game
    tetracubes.push(tetracube);
    currentTetracubeIndex++;
}


function changeFieldStates(tetracube, isFree) {
    let cubePositions = tetracube.getCubePositions();

    cubePositions.forEach(position => {
        collisionMap.set(`${position[0]}|${position[1]}|${position[2]}`, isFree);
    });
}


function checkIfGameOver() {
    if(tetracubes.length > 0) {
        let cubePositions = tetracubes[currentTetracubeIndex].getCubePositions();

        for(let i = 0; i < cubePositions.length; i++) {
            if(cubePositions[i][1] > 0.9) {
                isGameOver = true;
            }
        }
    }

    return isGameOver;
}


function checkIfTransformationIsPossible(tetracube, axisVector, isTranslation, isPositiveOrClockwise) {
    let cubePositions = tetracube.getCubePositions();

    for(let i = 0; i < cubePositions.length; i++) {
        let finalCoords = [];
        let newPosition = vec4.create();

        // Translation
        if(isTranslation) {
            let direction = isPositiveOrClockwise ? cubeSideLength : -cubeSideLength;
            let translationVector = vec3.create();
            let translation = mat4.create();

            vec3.scale(translationVector, axisVector, direction);
            mat4.fromTranslation(translation, translationVector);
            vec4.transformMat4(newPosition, vec4.fromValues(cubePositions[i][0], cubePositions[i][1], cubePositions[i][2], 1), translation);
        }

        // Rotation
        else {
            let translation = vec3.create();
            let translationInverse = vec3.create();
            let translationMatrix = mat4.create();
            let translationInverseMatrix = mat4.create();
            let rotationMatrix = mat4.create();
            let radian = isPositiveOrClockwise ? -1.5708 : 1.5708;      // => 90°

            mat4.getTranslation(translation, tetracube.modelMatrix);
            vec3.negate(translationInverse, translation);

            mat4.fromTranslation(translationMatrix, translation);
            mat4.fromTranslation(translationInverseMatrix, translationInverse);
            mat4.fromRotation(rotationMatrix, radian, axisVector);

            let transformation = mat4.create();
            mat4.multiply(transformation, rotationMatrix, translationInverseMatrix);
            mat4.multiply(transformation, translationMatrix, transformation);

            vec4.transformMat4(newPosition, vec4.fromValues(cubePositions[i][0], cubePositions[i][1], cubePositions[i][2], 1), transformation);
        }

        // Round coordinates to get rid of Floating Point Errors
        for(let k = 0; k < 3; k++) {
            finalCoords.push(parseFloat(newPosition[k]).toFixed(3));
        }

        if(finalCoords[1] < 0.9) {
            if(!collisionMap.get(`${finalCoords[0]}|${finalCoords[1]}|${finalCoords[2]}`)) {
                return false;
            }
        }
        else if(Math.abs(finalCoords[0]) > 0.3 || Math.abs(finalCoords[2]) > 0.3) {
            return false;
        }
    }

    return true;
}


function splitTetracubeIfNecessary(tetracube, index) {
    let cubePositions = tetracube.getCubePositions();
    let remainingCubes = cubePositions.slice();
    let connectedCubes = [];

    connectedCubes.push(remainingCubes[0]);
    remainingCubes.splice(0, 1);

    for(let i = 0; i < connectedCubes.length; i++) {
        let neighbourCoords = [];
        neighbourCoords.push([connectedCubes[i][0] + 0.15, connectedCubes[i][1], connectedCubes[i][2]]);
        neighbourCoords.push([connectedCubes[i][0] - 0.15, connectedCubes[i][1], connectedCubes[i][2]]);
        neighbourCoords.push([connectedCubes[i][0], connectedCubes[i][1] + 0.15, connectedCubes[i][2]]);
        neighbourCoords.push([connectedCubes[i][0], connectedCubes[i][1] - 0.15, connectedCubes[i][2]]);
        neighbourCoords.push([connectedCubes[i][0], connectedCubes[i][1], connectedCubes[i][2] + 0.15]);
        neighbourCoords.push([connectedCubes[i][0], connectedCubes[i][1], connectedCubes[i][2] - 0.15]);

        for(let j = 0; j < remainingCubes.length; j++) {
            for(let k = 0; k < neighbourCoords.length; k++) {
                if(remainingCubes[j][0] === neighbourCoords[k][0]
                    && remainingCubes[j][1] === neighbourCoords[k][1]
                    && remainingCubes[j][2] === neighbourCoords[k][2]) {
                    connectedCubes.push(remainingCubes[j]);
                    neighbourCoords.splice(k, 1);
                    remainingCubes.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
    }

    if(remainingCubes.length !== 0) {
        let newTetracube = new Tetracube(true);
        newTetracube.modelMatrix = mat4.clone(tetracubes[index].modelMatrix);

        let movedCubes = 0;
        remainingCubes.forEach(position => {
            let cubeIndex = cubePositions.indexOf(position);

            newTetracube.cubes.push(tetracubes[index].cubes[cubeIndex - movedCubes]);
            tetracubes[index].cubes.splice(cubeIndex - movedCubes, 1);
            movedCubes++;
        });

        // Check which Tetracube should be processed first
        if(remainingCubes[0][1] > connectedCubes[0][1]) {
            tetracubes.splice(index + 1, 0, newTetracube);
        }
        else {
            tetracubes.splice(index, 0, newTetracube);
        }

        currentTetracubeIndex++;
    }
}


function removePlanes(mapArray, removePlaneIndices, emptyPlaneIndex) {
    // Mark fields from first plane to remove up to empty plane as free
    // Remove Blocks
    // Let remaining blocks fall
    // Marks fields as occupied from bottom up till emptyPlaneIndex - planeIndices.length

    // Mark affected fields as free
    for(let i = removePlaneIndices[0]; i < emptyPlaneIndex; i++) {
        for(let k = 0; k < 16; k++) {
            collisionMap.set(mapArray[(i * 16) + k][0], true);
        }
    }

    // Remove blocks from full planes
    let yCoords = [];
    removePlaneIndices.forEach(planeIndex => {
        yCoords.push((planeIndex * cubeSideLength) + -0.825);
    });

    for(let i = 0; i < tetracubes.length; i++) {
        let cubePositions = tetracubes[i].getCubePositions();
        let isAffected = false;
        let cubesRemoved = 0;

        // Remove cubes from Tetracube
        for(let j = 0; j < cubePositions.length; j++) {
            for(let k = 0; k < yCoords.length; k++) {
                if(yCoords[k] === cubePositions[j][1]) {
                    tetracubes[i].cubes.splice(j - cubesRemoved, 1);
                    cubesRemoved++;

                    if(!isAffected) {
                        isAffected = true;
                    }
                    break;
                }
                else if(!isAffected && yCoords[0] < cubePositions[j][1]) {
                    isAffected = true;
                }
            }
        }

        if(isAffected) {
            if(cubesRemoved !== 0) {
                // Remove Tetracube if there aren't any cubes left
                if(tetracubes[i].cubes.length === 0) {
                    tetracubes.splice(i, 1);
                    i--;
                    currentTetracubeIndex--;

                    continue;
                }
                else if(tetracubes[i].cubes.length > 1) {
                    // Split remaining blocks in two Tetracube instances if necessary so that they can be handled individually.
                    splitTetracubeIfNecessary(tetracubes[i], i);
                }

                // Mark the fields where the remaining blocks are currently positioned as free because they will might fall down.
                if(cubesRemoved >= 2) {
                    changeFieldStates(tetracubes[i], true);
                }
            }

            // Let remaining blocks of the Tetracube fall
            while(checkIfTransformationIsPossible(tetracubes[i], [0, 1, 0], true, false)) {
                tetracubes[i].translate([0, 1, 0], false, cubeSideLength);
            }

            changeFieldStates(tetracubes[i], false);
        }
    }
}


function removePlaneIfNecessary() {
    // Check planes from bottom up
        // If a plane is completely free, stop
        // If plane is completely occupied, remove blocks
            // Let all the blocks fall
            // Free the old fields and mark the new ones as occupied
            // Loop

    let mapArray = Array.from(collisionMap);
    let removePlaneIndices = [];
    let emptyPlaneIndex = undefined;

    for(let i = 0; i < 12; i++) {
        let isPlaneFull = true;
        let isPlaneEmpty = true;

        for(let k = 0; k < 16; k++) {
            if(mapArray[(i * 16) + k][1]) {
                if(isPlaneFull) {
                    isPlaneFull = false;
                }
            }
            else if(isPlaneEmpty) {
                isPlaneEmpty = false;
            }

            if(!isPlaneFull && !isPlaneEmpty) {
                break;
            }
        }

        if(isPlaneEmpty) {
            emptyPlaneIndex = i;
            break;
        }
        else if(isPlaneFull) {
            removePlaneIndices.push(i);
        }
    }

    if(removePlaneIndices.length !== 0) {
        removePlanes(mapArray, removePlaneIndices, emptyPlaneIndex);
        removePlaneIfNecessary();
    }
}