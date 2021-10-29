
uniform float defaultStatus;
uniform sampler2D texture1;
uniform float time;
uniform vec2 resolution;
varying float vOpacity;
varying vec3 vUv;


void main() {
    
    vec4 t = texture2D(texture1, vUv);

    gl_FragColor = vec4(1, 1, 1, vOpacity); 
}