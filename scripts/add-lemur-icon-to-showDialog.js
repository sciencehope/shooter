import { globSync } from "glob"; // ✅ Correct ESM import for Node 22+
import fs from "node:fs";
import path from "node:path";

const root = "web/src";
const iconImport = `import { lemurIconPath } from '$lib/lemur-icon';`;

const files = globSync(`${root}/**/*.{ts,js,svelte}`, { absolute: true });

for (const file of files) {
  if (file.includes("node_modules") || file.includes("dist") || file.includes("build")) continue;

  let code = fs.readFileSync(file, "utf8");
  let updated = false;

  // Find modalManager.showDialog({ ... })
  const regex = /modalManager\.showDialog\s*\(\s*\{([^}]*)\}\s*\)/g;

  code = code.replace(regex, (match, inner) => {
    if (inner.includes("icon:")) {
      return match; // already has icon
    }
    updated = true;

    const newInner = inner.trim().endsWith(",")
      ? `${inner} icon: lemurIconPath,`
      : `${inner}${inner.trim().length ? ", " : ""}icon: lemurIconPath`;

    return `modalManager.showDialog({ ${newInner} })`;
  });

  if (updated) {
    // ✅ ensure import is present
    if (!code.includes(iconImport)) {
      const importBlock = code.match(/^(import .*;[\r\n]*)+/);
      if (importBlock) {
        code = code.replace(importBlock[0], `${importBlock[0]}${iconImport}\n`);
      } else {
        code = `${iconImport}\n${code}`;
      }
    }

    fs.writeFileSync(file, code, "utf8");
    console.log(`✔ Updated: ${path.relative(process.cwd(), file)}`);
  }
}
