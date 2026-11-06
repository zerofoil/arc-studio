#!/usr/bin/env node
import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputDir = __dirname + "/../../../../../packages/studio-server/src/engine/nodes";
const outputDir = __dirname;
console.log(`INPUT DIR: ${inputDir}`);
console.log(`OUTPUT DIR: ${outputDir}`);

function generateMdx(obj) {
  let mdx = `---\ntitle: "${obj.label}"\n---\n\n${obj.description}\n`;

  if (obj.inputs && obj.inputs.length > 0) {
    mdx += '\n## Inputs\n\n';
    obj.inputs.forEach(input => {
      if (input.type === "exec") return;
      mdx += `- ${input.label} (${input.type})\n`;
    });
  }

  if (obj.outputs && obj.outputs.length > 0) {
    mdx += '\n## Outputs\n\n';
    obj.outputs.forEach(output => {
      if (output.type === "exec") return;
      mdx += `- ${output.label} (${output.type})\n`;
    });
  }

  return mdx;
}

async function processFiles() {
  if (!existsSync(inputDir)) {
    console.error(`❌ Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  const files = readdirSync(inputDir, { recursive: true })
    .filter(file => file.endsWith('.js') || file.endsWith('.jsx'));

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const fullPath = join(inputDir, file);

    try {
      const module = await import(fullPath);
      const obj = module.default;

      if (!obj || !obj.type) {
        console.log(`⏭️  Skipped: ${file} (no default export or missing type)`);
        skipped++;
        continue;
      }

      const mdxContent = generateMdx(obj);

      // Calculate relative path from input directory
      const relativePath = relative(inputDir, dirname(fullPath));
      const outputSubdir = join(outputDir, relativePath);

      // Create output subdirectory if it doesn't exist
      mkdirSync(outputSubdir, { recursive: true });

      const outputFile = join(outputSubdir, `${obj.type}.mdx`);

      writeFileSync(outputFile, mdxContent, 'utf-8');
      console.log(`✅ Generated: ${relative(inputDir, outputFile)}`);
      processed++;
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
      skipped++;
    }
  }

  console.log(`\n🎉 Done! Generated ${processed} files. Skipped ${skipped}.`);
}

processFiles();
