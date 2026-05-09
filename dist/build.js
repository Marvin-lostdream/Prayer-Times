// build.js
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["script.js"], // ملف الجافاسكريبت الأساسي
    bundle: true,
    outfile: "dist/bundle.js", // سيتم إنشاء الملف هنا
  })
  .catch(() => process.exit(1));
