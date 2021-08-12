class ShapeTowerRight extends Tetracube {

    constructor() {
        super();

        // Translate the cubes to build the Tetracube
        mat4.translate(this.cubes[0].modelMatrix, this.cubes[0].modelMatrix, [-1, -1, 1]);
        mat4.translate(this.cubes[1].modelMatrix, this.cubes[1].modelMatrix, [1, -1, 1]);
        mat4.translate(this.cubes[2].modelMatrix, this.cubes[2].modelMatrix, [1, -1, -1]);
        mat4.translate(this.cubes[3].modelMatrix, this.cubes[3].modelMatrix, [1, 1, -1]);
        /*mat4.translate(this.cubes[0].modelMatrix, this.cubes[0].modelMatrix, [1, -1, 1]);
        mat4.translate(this.cubes[1].modelMatrix, this.cubes[1].modelMatrix, [-1, -1, 1]);
        mat4.translate(this.cubes[2].modelMatrix, this.cubes[2].modelMatrix, [-1, -1, -1]);
        mat4.translate(this.cubes[3].modelMatrix, this.cubes[3].modelMatrix, [-1, 1, -1]);*/
    }
}