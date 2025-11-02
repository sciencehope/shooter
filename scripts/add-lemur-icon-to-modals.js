// scripts/add-lemur-icon-to-modals-final.mjs
import fs from "fs";
import path from "path";

const ROOT = "web/src";
const ICON_IMPORT = "import { lemurIconPath } from '$lib/lemur-icon';";
const MODAL_REGEX = /<(ConfirmModal|Modal)(\s[\s\S]*?)?>/g;

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (file.endsWith(".svelte")) processFile(full);
  }
}

function insertImportLinewise(content) {
  if (content.includes(ICON_IMPORT)) return content;

  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("<script")) {
      // insert on the next line
      lines.splice(i + 1, 0, "  " + ICON_IMPORT);
      return lines.join("\n");
    }
  }

  // no <script> tag → add one at top
  return `<script lang="ts">\n  ${ICON_IMPORT}\n</script>\n\n${content}`;
}

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // add icon if missing
  content = content.replace(MODAL_REGEX, (match, tagName, attrs = "") => {
    if (/icon\s*=/.test(attrs)) return match;
    changed = true;
    return `<${tagName} icon={lemurIconPath}${attrs}>`;
  });

  if (!changed) return;

  // ensure import
  content = insertImportLinewise(content);

  fs.writeFileSync(file, content, "utf8");
  console.log(`✔ Updated: ${file}`);
}

walk(ROOT);
