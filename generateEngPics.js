// This script reads all image files from the img/eng_pics/ directory and
// generates a JSON file (img/eng_pics.json) containing an array of the image
// paths. The JSON file is used by the front‑end JavaScript to build the
// Engagement Photos slider dynamically.

const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, 'img', 'eng_pics');
const outFile = path.resolve(__dirname, 'img', 'eng_pics.json');

// Allowed image extensions
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

try {
    const files = fs.readdirSync(imgDir);
    const imageFiles = files.filter((f) => imageExts.has(path.extname(f).toLowerCase()));
    // Sort to keep a consistent order
    imageFiles.sort();
    const data = imageFiles.map((f) => path.join('img', 'eng_pics', f).replace(/\\/g, '/'));
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Generated ${outFile} with ${imageFiles.length} images.`);
} catch (err) {
    console.error('Error generating engagement pictures JSON:', err);
    process.exit(1);
}
