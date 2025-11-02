// scripts/rename-immich-to-shooter.js
import fs from "fs";
import path from "path";

const I18N_DIR = path.resolve("i18n");
const NEW_WORD = "Shooter";

// Regex for normal "Immich" mentions
const IMMICH_WORD_REGEX = /\bImmich\b/gi;

// Regex for the special case of smtp.immich.app → smtp.shooter.app
const SMTP_IMMICH_REGEX = /smtp\.immich\.app/gi;

// Regex for anything that looks like a domain or service identifier (tiles.immich.cloud etc.)
const IMMICH_DOT_REGEX = /\.immich\.(?!app)/i; // .immich. but not .immich.app

function walkDir(dir, callback) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walkDir(fullPath, callback);
    else callback(fullPath);
  }
}

walkDir(I18N_DIR, (filePath) => {
  if (!filePath.endsWith(".json")) return;

  const original = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(original);
  } catch (err) {
    console.error(`❌ Error parsing ${filePath}:`, err.message);
    return;
  }

  let changed = false;

  function replaceStrings(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "string") {
        // Skip replacements for keys or values that include `.immich.` (unless it's smtp.immich.app)
        if (IMMICH_DOT_REGEX.test(value)) continue;

        let newValue = value;

        // Handle smtp.immich.app
        newValue = newValue.replace(SMTP_IMMICH_REGEX, "smtp.shooter.app");

        // Replace plain Immich mentions
        newValue = newValue.replace(IMMICH_WORD_REGEX, (match) => {
          if (match === match.toUpperCase()) return NEW_WORD.toUpperCase();
          if (match[0] === match[0].toUpperCase())
            return NEW_WORD[0].toUpperCase() + NEW_WORD.slice(1);
          return NEW_WORD.toLowerCase();
        });

        if (newValue !== value) {
          obj[key] = newValue;
          changed = true;
        }
      } else if (typeof value === "object" && value !== null) {
        replaceStrings(value);
      }
    }
  }

  replaceStrings(data);

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  No changes: ${filePath}`);
  }
});

console.log("✨ Done replacing 'Immich' → 'Shooter' in i18n files (with domain exceptions)!");
