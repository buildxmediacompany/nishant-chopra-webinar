import sharp from "sharp";
import { stat } from "fs/promises";

const mediaDir = "/home/mehul/.gemini/antigravity/brain/c1841799-daf4-44cc-aa53-58879327ecee";
const outputDir = "./public/assets";

// The 6 images in the order they were shared:
// 5 PNGs (first message) + 1 JPG (second message)
const files = [
  { src: `${mediaDir}/media__1783959610602.png`, out: `${outputDir}/t7.webp` },  // guy in olive polo by water
  { src: `${mediaDir}/media__1783959610866.png`, out: `${outputDir}/t8.webp` },  // guy in navy hoodie at airport
  { src: `${mediaDir}/media__1783959611119.png`, out: `${outputDir}/t9.webp` },  // older man in teal polo smiling
  { src: `${mediaDir}/media__1783959611402.png`, out: `${outputDir}/t10.webp` }, // young woman at cafe
  { src: `${mediaDir}/media__1783959611457.png`, out: `${outputDir}/t11.webp` }, // woman in pink shirt on steps
  { src: `${mediaDir}/media__1783959711003.jpg`, out: `${outputDir}/t12.webp` }, // young man selfie outdoor
];

console.log("Converting and compressing 6 testimonial images...\n");

for (const { src, out } of files) {
  const before = (await stat(src)).size;
  await sharp(src)
    .resize(200, 200, { fit: "cover", position: "top" }) // crop top-biased for face portraits
    .webp({ quality: 85 })
    .toFile(out);
  const after = (await stat(out)).size;
  console.log(`✅ ${out.split("/").pop()}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
}

console.log("\nDone!");
