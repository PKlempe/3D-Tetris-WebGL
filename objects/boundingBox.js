class BoundingBox {
    vertices = [
        // Bottom: Corners
        [-0.30, -0.90, -0.30, 1.0],
        [ 0.30, -0.90, -0.30, 1.0],
        [ 0.30, -0.90,  0.30, 1.0],
        [-0.30, -0.90,  0.30, 1.0],

        // Bottom: Vertical Cross lines
        [-0.15, -0.90, -0.30, 1.0],
        [-0.15, -0.90,  0.30, 1.0],
        [ 0.00, -0.90, -0.30, 1.0],
        [ 0.00, -0.90,  0.30, 1.0],
        [ 0.15, -0.90, -0.30, 1.0],
        [ 0.15, -0.90,  0.30, 1.0],

        // Bottom: Horizontal Cross lines
        [-0.30, -0.90, -0.15, 1.0],
        [ 0.30, -0.90, -0.15, 1.0],
        [-0.30, -0.90,  0.00, 1.0],
        [ 0.30, -0.90,  0.00, 1.0],
        [-0.30, -0.90,  0.15, 1.0],
        [ 0.30, -0.90,  0.15, 1.0],

        // Left: Additional Corners
        [-0.30,  0.90,  0.30, 1.0],
        [-0.30,  0.90, -0.30, 1.0],

        // Left: Additional Vertical Cross Lines
        [-0.30,  0.90, -0.15, 1.0],
        [-0.30,  0.90,  0.00, 1.0],
        [-0.30,  0.90,  0.15, 1.0],

        // Left: Additional Horizontal Cross Lines
        [-0.30, -0.75, -0.30, 1.0],
        [-0.30, -0.75,  0.30, 1.0],
        [-0.30, -0.60, -0.30, 1.0],
        [-0.30, -0.60,  0.30, 1.0],
        [-0.30, -0.45, -0.30, 1.0],
        [-0.30, -0.45,  0.30, 1.0],
        [-0.30, -0.30, -0.30, 1.0],
        [-0.30, -0.30,  0.30, 1.0],
        [-0.30, -0.15, -0.30, 1.0],
        [-0.30, -0.15,  0.30, 1.0],
        [-0.30,  0.00, -0.30, 1.0],
        [-0.30,  0.00,  0.30, 1.0],
        [-0.30,  0.15, -0.30, 1.0],
        [-0.30,  0.15,  0.30, 1.0],
        [-0.30,  0.30, -0.30, 1.0],
        [-0.30,  0.30,  0.30, 1.0],
        [-0.30,  0.45, -0.30, 1.0],
        [-0.30,  0.45,  0.30, 1.0],
        [-0.30,  0.60, -0.30, 1.0],
        [-0.30,  0.60,  0.30, 1.0],
        [-0.30,  0.75, -0.30, 1.0],
        [-0.30,  0.75,  0.30, 1.0],
        [-0.30,  0.90, -0.30, 1.0],
        [-0.30,  0.90,  0.30, 1.0],

        // Back: Additional Corners
        [-0.30,  0.90, -0.30, 1.0],
        [ 0.30,  0.90, -0.30, 1.0],

        // Back: Additional Vertical Cross Lines
        [-0.15,  0.90, -0.30, 1.0],
        [ 0.00,  0.90, -0.30, 1.0],
        [ 0.15,  0.90, -0.30, 1.0],

        // Back: Additional Horizontal Cross Lines
        [-0.30, -0.75, -0.30, 1.0],
        [ 0.30, -0.75, -0.30, 1.0],
        [-0.30, -0.60, -0.30, 1.0],
        [ 0.30, -0.60, -0.30, 1.0],
        [-0.30, -0.45, -0.30, 1.0],
        [ 0.30, -0.45, -0.30, 1.0],
        [-0.30, -0.30, -0.30, 1.0],
        [ 0.30, -0.30, -0.30, 1.0],
        [-0.30, -0.15, -0.30, 1.0],
        [ 0.30, -0.15, -0.30, 1.0],
        [-0.30,  0.00, -0.30, 1.0],
        [ 0.30,  0.00, -0.30, 1.0],
        [-0.30,  0.15, -0.30, 1.0],
        [ 0.30,  0.15, -0.30, 1.0],
        [-0.30,  0.30, -0.30, 1.0],
        [ 0.30,  0.30, -0.30, 1.0],
        [-0.30,  0.45, -0.30, 1.0],
        [ 0.30,  0.45, -0.30, 1.0],
        [-0.30,  0.60, -0.30, 1.0],
        [ 0.30,  0.60, -0.30, 1.0],
        [-0.30,  0.75, -0.30, 1.0],
        [ 0.30,  0.75, -0.30, 1.0],
        [-0.30,  0.90, -0.30, 1.0],
        [ 0.30,  0.90, -0.30, 1.0],
    ];

    indices = [
        // Bottom: Square
        0,  1,
        1,  2,
        2,  3,
        3,  0,

        // Bottom: Vertical Cross Lines
        4,  5,
        6,  7,
        8,  9,

        // Bottom: Horizontal Cross Lines
        10, 11,
        12, 13,
        14, 15,

        // Left: Square
        16, 17,
        16,  3,
        17,  0,

        // Left: Vertical Cross Lines
        18, 10,
        19, 12,
        20, 14,

        // Left: Horizontal Cross Lines
        21, 22,
        23, 24,
        25, 26,
        27, 28,
        29, 30,
        31, 32,
        33, 34,
        35, 36,
        37, 38,
        39, 40,
        41, 42,
        43, 44,

        // Back: Square
        45, 46,
        45,  0,
        46,  1,

        // Back: Vertical Cross Lines
        47,  4,
        48,  6,
        49,  8,

        // Back: Horizontal Cross Lines
        50, 51,
        52, 53,
        54, 55,
        56, 57,
        58, 59,
        60, 61,
        62, 63,
        64, 65,
        66, 67,
        68, 69,
        70, 71,
        72, 73
    ];

    colors = [];

    constructor() {
        this.modelMatrix = mat4.create();
        this.#initBuffers();

        for(let i = 0; i < this.indices.length; i++) {
            this.colors.push(1.0, 1.0, 1.0, 1.0);
        }
    }

    // ### Private Methods ###
    #initBuffers() {
        // Vertex Buffer
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices.flat()), gl.STATIC_DRAW);

        // Index Buffer
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        // Color Buffer
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors.flat()), gl.STATIC_DRAW);
    }

}