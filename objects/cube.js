class Cube {

    constructor() {
        this.modelMatrix = mat4.create();
        this.colors = [];
        this.vertices = [
            [
                0.85,
                0.85,
                -1,
                1
            ],
            [
                0.85,
                1,
                -0.85,
                1
            ],
            [
                1,
                0.85,
                -0.85,
                1
            ],
            [
                0.85,
                -1,
                -0.85,
                1
            ],
            [
                0.85,
                -0.85,
                -1,
                1
            ],
            [
                1,
                -0.85,
                -0.85,
                1
            ],
            [
                1,
                0.85,
                0.85,
                1
            ],
            [
                0.85,
                1,
                0.85,
                1
            ],
            [
                0.85,
                0.85,
                1,
                1
            ],
            [
                1,
                -0.85,
                0.85,
                1
            ],
            [
                0.85,
                -0.85,
                1,
                1
            ],
            [
                0.85,
                -1,
                0.85,
                1
            ],
            [
                -0.85,
                0.85,
                -1,
                1
            ],
            [
                -1,
                0.85,
                -0.85,
                1
            ],
            [
                -0.85,
                1,
                -0.85,
                1
            ],
            [
                -1,
                -0.85,
                -0.85,
                1
            ],
            [
                -0.85,
                -0.85,
                -1,
                1
            ],
            [
                -0.85,
                -1,
                -0.85,
                1
            ],
            [
                -1,
                0.85,
                0.85,
                1
            ],
            [
                -0.85,
                0.85,
                1,
                1
            ],
            [
                -0.85,
                1,
                0.85,
                1
            ],
            [
                -0.85,
                -1,
                0.85,
                1
            ],
            [
                -0.85,
                -0.85,
                1,
                1
            ],
            [
                -1,
                -0.85,
                0.85,
                1
            ]
        ];
        this.indices = [
            3,
            21,
            17,
            18,
            15,
            23,
            8,
            22,
            10,
            14,
            7,
            1,
            2,
            9,
            5,
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            21,
            15,
            17,
            17,
            4,
            3,
            5,
            0,
            2,
            19,
            23,
            22,
            10,
            6,
            8,
            16,
            13,
            12,
            20,
            8,
            7,
            7,
            2,
            1,
            11,
            22,
            21,
            14,
            18,
            20,
            1,
            12,
            14,
            3,
            9,
            11,
            12,
            4,
            16,
            3,
            11,
            21,
            18,
            13,
            15,
            8,
            19,
            22,
            14,
            20,
            7,
            2,
            6,
            9,
            21,
            23,
            15,
            17,
            16,
            4,
            5,
            4,
            0,
            19,
            18,
            23,
            10,
            9,
            6,
            16,
            15,
            13,
            20,
            19,
            8,
            7,
            6,
            2,
            11,
            10,
            22,
            14,
            13,
            18,
            1,
            0,
            12,
            3,
            5,
            9,
            12,
            0,
            4
        ];
        this.normals = [
            0.3416,
            0.3416,
            -0.8756,
            0.3416,
            0.8756,
            -0.3416,
            0.8756,
            0.3416,
            -0.3416,
            0.3416,
            -0.8756,
            -0.3416,
            0.3416,
            -0.3416,
            -0.8756,
            0.8756,
            -0.3416,
            -0.3416,
            0.8756,
            0.3416,
            0.3416,
            0.3416,
            0.8756,
            0.3416,
            0.3416,
            0.3416,
            0.8756,
            0.8756,
            -0.3416,
            0.3416,
            0.3416,
            -0.3416,
            0.8756,
            0.3416,
            -0.8756,
            0.3416,
            -0.3416,
            0.3416,
            -0.8756,
            -0.8756,
            0.3416,
            -0.3416,
            -0.3416,
            0.8756,
            -0.3416,
            -0.8756,
            -0.3416,
            -0.3416,
            -0.3416,
            -0.3416,
            -0.8756,
            -0.3416,
            -0.8756,
            -0.3416,
            -0.8756,
            0.3416,
            0.3416,
            -0.3416,
            0.3416,
            0.8756,
            -0.3416,
            0.8756,
            0.3416,
            -0.3416,
            -0.8756,
            0.3416,
            -0.3416,
            -0.3416,
            0.8756,
            -0.8756,
            -0.3416,
            0.3416
        ];
        //this.textures = [];   // TODO: Add texture support
    }
}