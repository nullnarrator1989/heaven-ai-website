// Shader strings for Three.js morph/typography surface
// Vertex shader: basic displacement based on time and noise
export const vertexShader = `
  varying vec2 vUv;
  varying float vNoise;
  uniform float uTime;

  float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float n = rand(uv + uTime * 0.01);
    vNoise = n;
    pos += normal * sin(uTime * 0.8 + n * 6.2831) * 6.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  varying float vNoise;
  uniform sampler2D uTextTex;
  uniform float uTime;

  void main() {
    vec3 base = vec3(0.03, 0.07, 0.12);
    vec4 t = texture2D(uTextTex, fract(vUv + vec2(uTime * 0.02, uTime * 0.01)));
    float alpha = t.r * 0.65;
    vec3 glow = mix(vec3(0.2, 0.5, 0.8), vec3(1.0, 0.6, 0.2), t.g);
    vec3 col = base + glow * alpha * 0.9;
    gl_FragColor = vec4(col, 0.95);
  }
`;
