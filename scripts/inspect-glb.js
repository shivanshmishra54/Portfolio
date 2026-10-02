import fs from 'fs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Actually, GLTFLoader needs a DOM/browser environment or a polyfill like headless-gl. 
// A better way to inspect GLB metadata in Node is using gltf-pipeline or just printing the GLTF JSON chunk.
// Let's write a simple binary parser for the GLB JSON chunk.
const buffer = fs.readFileSync('./public/models/avatar.glb');

const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546C67) {
    console.error("Not a valid GLB");
    process.exit(1);
}

const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);
const chunkLength = buffer.readUInt32LE(12);
const chunkType = buffer.readUInt32LE(16);

if (chunkType !== 0x4E4F534A) { // 'JSON'
    console.error("First chunk is not JSON");
    process.exit(1);
}

const jsonChunk = buffer.toString('utf8', 20, 20 + chunkLength);
const gltf = JSON.parse(jsonChunk);

console.log("GLTF nodes:", gltf.nodes ? gltf.nodes.length : 0);
console.log("GLTF meshes:", gltf.meshes ? gltf.meshes.length : 0);
console.log("GLTF animations:", gltf.animations ? gltf.animations.length : 0);

if (gltf.animations) {
    console.log("\nAnimations:");
    gltf.animations.forEach((anim, i) => {
        console.log(`- [${i}] ${anim.name || 'Unnamed'}`);
    });
}

if (gltf.nodes) {
    console.log("\nNodes (Bones/Meshes):");
    const nodeNames = gltf.nodes.map(n => n.name).filter(Boolean);
    console.log(nodeNames.join(', '));
}

if (gltf.meshes) {
    console.log("\nMeshes & Morph Targets (Blendshapes):");
    gltf.meshes.forEach((mesh, i) => {
        const primTargetCounts = mesh.primitives ? mesh.primitives.map(p => p.targets ? p.targets.length : 0) : [];
        console.log(`Mesh [${i}] ${mesh.name || 'Unnamed'} - Primitives targets: ${primTargetCounts.join(', ')}`);
        if (mesh.extras && mesh.extras.targetNames) {
            console.log(`  Target names: ${mesh.extras.targetNames.join(', ')}`);
        }
    });
}

