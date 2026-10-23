import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const requested = process.argv[2] || process.env.WEBSITE_DESIGN || 'fieldguide';
if (requested !== 'fieldguide') throw new Error('Field Guide is the selected design. Build without a design argument.');
const html = await readFile(path.join(root, 'site/fieldguide.html'), 'utf8');
// dist is generated output; previous design rounds remain in the source and archives.
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'assets'), { recursive: true });
for (const asset of ["fieldguide.css", "fieldguide.js", "fieldguide-content.js", "carousel.js", "favicon.svg", "speaking.jpg", "workstation.jpg", "teaching.jpg", "portrait.jpg", "keynote-main.jpg", "spark-speakers.jpg", "students.jpg", "student-group.jpg", "gdg-devfest.jpg", "analytics-vidhya.jpg", "ieee-speaking.jpg", "sports-soccer.jpg", "sports-rowing.jpg", "sports-5k.jpg", "sports-soccer-match.jpg", "sports-fundraiser.jpg", "papers/watchtower.pdf", "neet-buddy-neet.jpg", "neet-buddy-buddy.jpg", "barkour-preview.jpg", "chronicles-preview.jpg"]) {
  await mkdir(path.dirname(path.join(out, 'assets', asset)), { recursive: true });
  await cp(path.join(root, 'site/assets', asset), path.join(out, 'assets', asset));
}
await writeFile(path.join(out, 'index.html'), html);
await writeFile(path.join(out, 'fieldguide.html'), html);
await writeFile(path.join(out, '.nojekyll'), '');
console.log(`Built Field Guide. Output: ${out}`);
