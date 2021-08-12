//
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    let msg;
    let vertShdr;
    let fragShdr;

    const vertElem = document.getElementById(vertexShaderId);
    if ( !vertElem ) { 
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }

    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );     // Create a Vertex Shader Object
        gl.shaderSource( vertShdr, vertElem.text );         // Add vertex shader code
        gl.compileShader( vertShdr );                       // Compile the vertex shader

        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            msg = "Vertex shader failed to compile.  The error log is:"
                + "<pre>" + gl.getShaderInfoLog(vertShdr) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    const fragElem = document.getElementById(fragmentShaderId);
    if ( !fragElem ) { 
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }

    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );   // Create a Fragment Shader Object
        gl.shaderSource( fragShdr, fragElem.text );         // Add fragment shader code
        gl.compileShader( fragShdr );                       // Compile fragment shader

        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            msg = "Fragment shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    const program = gl.createProgram();         // Create a shader program to store the shaders
    gl.attachShader( program, vertShdr );       // Add the vertex shader
    gl.attachShader( program, fragShdr );       // Add the fragment shader
    gl.linkProgram( program );                  // Link shader functions together
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}
