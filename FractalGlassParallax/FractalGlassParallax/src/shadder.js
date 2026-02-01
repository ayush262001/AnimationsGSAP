export const vertexShader = `
varying vec2 vUv;
void main() {
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uMouse;

uniform float uParallaxStrength;
uniform float uDistortionMultiplier;
uniform float uGlassStrength;
uniform float uStripesFrequency;
uniform float uGlassSmoothness;
uniform float uEdgePadding;

varying vec2 vUv;

/* -------------------------------------
   Cover UV (object-fit: cover)
------------------------------------- */
vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;

    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);

    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;

    return (uv * uResolution - offset) / scaledSize;
}

/* -------------------------------------
   Stripe displacement
------------------------------------- */
float displacement(float x, float stripes, float strength) {
    float modulus = 1.0 / stripes;
    return mod(x, modulus) * strength;
}

/* -------------------------------------
   Fractal glass distortion
------------------------------------- */
float fractalGlass(float x) {
    float d = 0.0;

    for (int i = -5; i <= 5; i++) {
        d += displacement(
            x + float(i) * uGlassSmoothness,
            uStripesFrequency,
            uGlassStrength
        );
    }

    d /= 11.0;
    return x + d;
}

/* -------------------------------------
   Edge falloff
------------------------------------- */
float smoothEdge(float x, float padding) {
    float edge = padding;

    if (x < edge) {
        return smoothstep(0.0, edge, x);
    } 
    else if (x > 1.0 - edge) {
        return smoothstep(1.0, 1.0 - edge, x);
    }

    return 1.0;
}

/* -------------------------------------
   Main
------------------------------------- */
void main() {
    vec2 uv = vUv;

    float originalX = uv.x;

    // Edge mask
    float edgeFactor = smoothEdge(originalX, uEdgePadding);

    // Glass distortion
    float distortedX = fractalGlass(originalX);
    uv.x = mix(originalX, distortedX, edgeFactor);

    float distortionFactor = uv.x - originalX;

    // Parallax
    float parallaxDirection = -sign(0.5 - uMouse.x);
    vec2 parallaxOffset = vec2(
        distortionFactor * uParallaxStrength * parallaxDirection,
        0.0
    );

    parallaxOffset *= edgeFactor;
    uv += parallaxOffset;

    // Cover UV
    vec2 coverUV = getCoverUV(uv, uTextureSize);
    coverUV = clamp(coverUV, 0.0, 1.0);

    vec4 color = texture2D(uTexture, coverUV);
    gl_FragColor = color;
}
`;