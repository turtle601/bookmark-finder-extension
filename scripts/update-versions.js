#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 명령행 인수에서 버전을 가져오거나 환경변수에서 가져옴
const version =
  process.argv[2] ||
  process.env.npm_package_version ||
  process.env.RELEASE_VERSION;

if (!version) {
  console.error(
    'Error: Version is required. Usage: node update-versions.js <version>'
  );
  process.exit(1);
}

console.log(`Updating versions to ${version}...`);

// 업데이트할 파일 목록
const files = [
  'apps/chrome-extension/package.json',
  'apps/chrome-extension/public/manifest.json',
];

let updatedCount = 0;

files.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // JSON 파일인지 확인하고 적절한 정규식 사용
      if (filePath.endsWith('.json')) {
        // JSON 파일의 경우 더 정확한 패턴 사용
        const updated = content.replace(
          /"version"\s*:\s*"[^"]*"/g,
          `"version": "${version}"`
        );

        if (updated !== content) {
          fs.writeFileSync(filePath, updated);
          console.log(`✅ Updated ${filePath}`);
          updatedCount++;
        } else {
          console.log(`⏭️  No changes needed for ${filePath}`);
        }
      } else {
        // 일반 텍스트 파일의 경우
        const updated = content.replace(
          /version\s*=\s*"[^"]*"/g,
          `version = "${version}"`
        );

        if (updated !== content) {
          fs.writeFileSync(filePath, updated);
          console.log(`✅ Updated ${filePath}`);
          updatedCount++;
        } else {
          console.log(`⏭️  No changes needed for ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log(`\n🎉 Version update complete! ${updatedCount} files updated.`);
