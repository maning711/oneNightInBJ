const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs");

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

cleanDir(outDir);
fs.copyFileSync(path.join(root, "index.html"), path.join(outDir, "index.html"));
fs.copyFileSync(path.join(root, "homm-lite.html"), path.join(outDir, "homm-lite.html"));
copyDir(path.join(root, "src"), path.join(outDir, "src"));
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

console.log(`Built static site into ${outDir}`);
