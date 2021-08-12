const {mat3, mat4, vec3, vec4} = glMatrix;

let canvas;
let gl;

let viewMatrix;
let orthogonalProjectionMatrix;
let perspectiveProjectionMatrix;

let shaderPrograms = [];
let tetracubes = [];
let boundingBox;
let grid3D;

// Shading Values (Light / Object Colors & Shininess)
let lightIntensity = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
let materialKa = 0.1;
let materialKd = 1.0;
let materialKs = 1.0;
let materialShininess = 20.0;

let ambientProduct = vec4.create();
let diffuseProduct = vec4.create();
let specularProduct = vec4.create();

let sliderMaterialKa;
let sliderMaterialKd;
let sliderMaterialKs;

// Uniform Locations
let modelViewMatrixLocation;
let projectionMatrixLocation;
let normalMatrixLocation;
let ambientProductLocation;
let diffuseProductLocation;
let specularProductLocation;
let materialShininessLocation;


window.onload = function init() {
    // Creating the canvas
    canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 850;
    document.querySelector('body').appendChild(canvas);     // Append it to the HTML body
    gl = canvas.getContext('webgl');                        // Get the WebGL Rendering Context

    // Check if WebGL is being supported.
    if (!gl) {
        alert("WebGL isn't supported by this browser.")
    }

    // Get the sliders for the Shading coefficients
    sliderMaterialKa = document.getElementById("materialKa");
    sliderMaterialKd = document.getElementById("materialKd");
    sliderMaterialKs = document.getElementById("materialKs");

    // Update the coefficient values each time the slider is being moved
    sliderMaterialKa.oninput = function() {
        materialKa = sliderMaterialKa.value / 100;
    }
    sliderMaterialKd.oninput = function() {
        materialKd = sliderMaterialKd.value / 100;
    }
    sliderMaterialKs.oninput = function() {
        materialKs = sliderMaterialKs.value / 100;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);     // Set the view port
    gl.clearColor(0, 0, 0, 1.0);         // Clear the canvas and set its color
    gl.enable(gl.DEPTH_TEST);                                 // Activates depth comparisons and updates to the depth buffer.


    // Create & Initialize Shader Programs
    initShaderPrograms();

    // Initialize Matrices
    viewMatrix = initViewMatrix();              // Initialize View Matrix
    initProjectionMatrices();                   // Initialize Projection Matrices

    // Initialize Event Listeners
    initEventListeners();

    // Initialize Game
    initGame();

    // Start rendering
    render();
}


function initViewMatrix() {
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, defaultCameraPosition, [0, 0, 0], [0, 1, 0]);

    return viewMatrix;
}


function initProjectionMatrices() {
    const aspectRatio = canvas.width / canvas.height;
    const fovVertical = glMatrix.glMatrix.toRadian(60);

    // Orthogonal Projection Matrix
    orthogonalProjectionMatrix = mat4.create();
    mat4.ortho(orthogonalProjectionMatrix, -aspectRatio, aspectRatio, -1, 1, 1, 100);

    // Perspective Projection Matrix
    perspectiveProjectionMatrix = mat4.create();
    mat4.perspective(perspectiveProjectionMatrix, fovVertical, aspectRatio, 1, 100);
}


function initShaderPrograms() {
    let shaderProgramNoShading = initShaders(gl, "vertexShaderNoShading", "fragmentShaderNoShading");
    let shaderProgramGouraud = initShaders(gl, "vertexShaderGouraud", "fragmentShaderGouraud");
    let shaderProgramPhong = initShaders(gl, "vertexShaderPhong", "fragmentShaderPhong");
    shaderPrograms.push(shaderProgramNoShading, shaderProgramGouraud, shaderProgramPhong);
}


function updateShadingCoefficients() {
    vec4.scale(ambientProduct, lightIntensity, materialKa);
    vec4.scale(diffuseProduct, lightIntensity, materialKd);
    vec4.scale(specularProduct, lightIntensity, materialKs);

    // Set new Shading coefficients
    gl.uniform4fv(ambientProductLocation, ambientProduct);
    gl.uniform4fv(diffuseProductLocation, diffuseProduct);
    gl.uniform4fv(specularProductLocation, specularProduct);
}


function switchShaderProgram(shaderProgramIndex) {
    let shaderProgram = shaderPrograms[shaderProgramIndex];
    gl.useProgram(shaderProgram);   // Set the shader program used by WebGL

    // ### Basic Uniforms ###
    // Get locations of the uniform matrices
    modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    // Set the selected Projection Matrix
    let projectionMatrix = isProjectionOrthogonal ? orthogonalProjectionMatrix : perspectiveProjectionMatrix;
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    // ### Shading ###
    if(shaderProgramIndex !== 0) {
        // Get locations of uniform variables and set their values
        normalMatrixLocation = gl.getUniformLocation(shaderProgram, "normalMatrix");

        ambientProductLocation = gl.getUniformLocation(shaderProgram, "ambientProduct");
        diffuseProductLocation = gl.getUniformLocation(shaderProgram, "diffuseProduct");
        specularProductLocation = gl.getUniformLocation(shaderProgram, "specularProduct");
        materialShininessLocation = gl.getUniformLocation(shaderProgram, "shininess");

        gl.uniform1f(materialShininessLocation, materialShininess);
    }
}


function prepareBuffers(cube) {
    // ### Vertex Buffer ###
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexBuffer);
    // Attribute
    let vPosition = gl.getAttribLocation(shaderPrograms[selectedShaderProgram], "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    // ### Color Buffer ###
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
    // Attribute
    let vColor = gl.getAttribLocation(shaderPrograms[selectedShaderProgram], "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vColor);


    // ### Index Buffer ###
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.indexBuffer);


    // ### Normal Buffer ###
    if(cube.normalBuffer !== undefined) {
        gl.bindBuffer(gl.ARRAY_BUFFER, cube.normalBuffer);
        // Attribute
        let vNormal = gl.getAttribLocation(shaderPrograms[selectedShaderProgram], "vNormal");
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray(vNormal);
    }
}


function render() {
    let modelViewMatrix = mat4.create();

    // Clear the color and depth buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Clears buffers to preset values.

    updateShadingCoefficients();

    // Rendering the Bounding Box
    switchShaderProgram(0);         // Disable Shading

    mat4.multiply(modelViewMatrix, viewMatrix, boundingBox.modelMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
    prepareBuffers(boundingBox);
    gl.drawElements(gl.LINES, boundingBox.indices.length, gl.UNSIGNED_SHORT, 0);

    // Rendering the 3D Grid
    if(gridEnabled) {
        mat4.multiply(modelViewMatrix, viewMatrix, grid3D.modelMatrix);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
        prepareBuffers(grid3D);
        gl.drawElements(gl.LINES, grid3D.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    switchShaderProgram(selectedShaderProgram);     // Enable Shading


    // Rendering the Tetracubes
    tetracubes.forEach(tetracube => {
        tetracube.cubes.forEach(cube => {
            // Calculate the ModelView Matrix and the Normal Matrix
            let modelMatrix = mat4.create();
            mat4.multiply(modelMatrix, tetracube.modelMatrix, cube.modelMatrix);
            mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

            // Normal Matrix
            let normalMatrix = mat3.create();
            mat3.normalFromMat4(normalMatrix, modelViewMatrix);     // Invert-transpose of the ModelView Matrix

            // Set remaining uniforms
            gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);   // Model Matrix
            gl.uniformMatrix3fv(normalMatrixLocation, false, normalMatrix);         // Normal Matrix

            // Fill buffers with the corresponding data
            prepareBuffers(cube);

            // Draw the object
            gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);    // Renders primitives (points, lines, triangles) from array data.
        });
    });

    // Progress Game
    progressGame();

    // Update Animation
    requestAnimationFrame(render);  // Tells the browser that we want to perform an animation and requests to update it by calling the specified function.
}

