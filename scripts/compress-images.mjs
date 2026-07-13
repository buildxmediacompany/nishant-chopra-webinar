import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, basename, extname } from "path";

const assetsDir = "./public/assets";

const files = await readdir(assetsDir);
const pngs = files.filter((f) => extname(f).toLowerCase() === ".png");

console.log(`Found ${pngs.length} PNG files to process...\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of pngs) {
  const input = join(assetsDir, file);
  const output = join(assetsDir, basename(file, ".png") + ".webp");

  const before = (await stat(input)).size;

  await sharp(input)
    .webp({ quality: 82 }) // 82 quality = excellent visual + great compression
    .toFile(output);

  const after = (await stat(output)).size;
  const saving = (((before - after) / before) * 100).toFixed(1);

  totalBefore += before;
  totalAfter += after;

  console.log(
    `${file.padEnd(12)} ${(before / 1024 / 1024).toFixed(2)} MB  →  ${(after / 1024 / 1024).toFixed(2)} MB  (${saving}% smaller)`
  );
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)} MB  →  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`
);
console.log(
  `Overall saving: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`
);
console.log("\n✅ WebP files created. Update your <Image> src props to use .webp instead of .png");
