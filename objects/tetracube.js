class Tetracube {

    static cubeColors = {
        ShapeI:             [ 1.00, 0.00, 1.00, 1.00 ],    // Magenta
        ShapeL:             [ 0.44, 0.16, 0.39, 1.00 ],    // Byzantium
        ShapeN:             [ 1.00, 0.00, 0.00, 1.00 ],    // Red
        ShapeO:             [ 1.00, 0.87, 0.00, 1.00 ],    // Golden Yellow
        ShapeT:             [ 0.00, 0.28, 0.67, 1.00 ],    // Cobalt Blue
        ShapeTowerLeft:     [ 0.50, 1.00, 0.00, 1.00 ],    // Chartreuse
        ShapeTowerRight:    [ 0.52, 0.52, 0.51, 1.00 ],    // Battleship Gray
        ShapeTripod:        [ 0.25, 0.88, 0.82, 1.00 ]     // Turquoise
    };

    constructor(initEmpty) {
        this.cubes = [];

        if(!initEmpty) {
            this.modelMatrix = mat4.create();

            // Create the cubes
            for(let i = 0; i < 4; i++) {
                this.cubes.push(new Cube());
            }

            // Generate the Vertex Colors for the cubes
            const colors = Tetracube.#generateColorArray(this.cubes[0].vertices.length,
                                                         Tetracube.cubeColors[this.constructor.name]);
            this.cubes.forEach(cube => {
                cube.colors = colors;
            });

            this.#initBuffers();
        }
    }


    // ### Private Methods ###
    static #generateColorArray(amountVertices, color) {
        let colors = [];

        for(let i = 0; i < amountVertices; i++) {
            colors.push(color);
        }

        return colors.flat();
    }

    #initBuffers() {
        this.cubes.forEach(cube => {
            // Vertex Buffer
            cube.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices.flat()), gl.STATIC_DRAW);

            // Index Buffer
            cube.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indices), gl.STATIC_DRAW);

            // Color Buffer
            cube.colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors.flat()), gl.STATIC_DRAW);

            // Normal Buffer
            cube.normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cube.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.normals), gl.STATIC_DRAW);
        });
    }


    // ### Public Methods ###
    translate(axisVector, positiveDir, amount) {
        let direction = positiveDir ? amount : -amount;
        let translationVector = vec3.create();
        let translation = mat4.create();

        vec3.scale(translationVector, axisVector, direction);
        mat4.fromTranslation(translation, translationVector);
        mat4.multiply(this.modelMatrix, translation, this.modelMatrix);
    }

    rotate(axisVector, clockwise) {
        let translation = vec3.create();
        let translationInverse = vec3.create();
        let translationMatrix = mat4.create();
        let translationInverseMatrix = mat4.create();
        let rotationMatrix = mat4.create();
        let radian = clockwise ? -1.5708 : 1.5708;      // => 90°

        mat4.getTranslation(translation, this.modelMatrix);
        vec3.negate(translationInverse, translation);

        mat4.fromTranslation(translationMatrix, translation);
        mat4.fromTranslation(translationInverseMatrix, translationInverse);
        mat4.fromRotation(rotationMatrix, radian, axisVector);

        let transformation = mat4.create();
        mat4.multiply(transformation, rotationMatrix, translationInverseMatrix);
        mat4.multiply(transformation, translationMatrix, transformation);

        mat4.multiply(this.modelMatrix, transformation, this.modelMatrix);
    }

    getCubePositions() {
        let positions = [];

        this.cubes.forEach(cube => {
            let transform = mat4.create();
            let position = vec4.create();

            mat4.multiply(transform, this.modelMatrix, cube.modelMatrix);
            vec4.transformMat4(position, [0, 0, 0, 1], transform);

            let components = [];
            for(let i = 0; i < 3; i++) {
                components.push(parseFloat(position[i].toFixed(3)));
            }

            positions.push(components);
        });

        return positions;
    }
}