

attribute float vertexDisplacement;
uniform float defaultStatus;
varying float vOpacity;
varying vec3 vUv;
void main() {

    vUv = position;
    vOpacity = vertexDisplacement;

    vec3 p = position;

    p.x += sin(vertexDisplacement) * 20.0;
    p.y += cos(vertexDisplacement) * 20.0;
     
    vect modelViewPosition = modelViewMatrix * vec4(position * 1.0);
    gl_position = projectionMatrix * modelViewPosition;
}