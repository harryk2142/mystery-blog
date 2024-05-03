import fs from "fs";
import path from "path";
import sharp from "sharp";

const pathToImages = "./cms/images/blog";

const outputDirs = {
  blog: "./public/images/blog",
  sharing: "./public/images/blog/sharing",
  small: "./public/images/blog/small",
};

// Stelle sicher, dass die Ausgabeordner existieren
Object.values(outputDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

fs.readdir(pathToImages, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = path.join(pathToImages, file);
    const fileNameWithoutExt = path.parse(file).name;
    const fileExtension = path.extname(file);

    if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      if (fileExtension === ".webp") {
        fs.copyFile(inputFilePath, `${outputDirs.blog}/${file}`, (err) => {
          if (err) {
            console.error("Fehler beim Kopieren des Bildes:", err);
          }
        });
      } else {
        sharp(inputFilePath)
          .resize(1024)
          .toFormat("webp")
          .toFile(`${outputDirs.blog}/${fileNameWithoutExt}.webp`);
      }

      // Transformiere andere Bildformate

      // Für Sharing als JPEG mit 512x512
      sharp(inputFilePath)
        .resize(512)
        .toFormat("jpeg")
        .toFile(`${outputDirs.sharing}/${fileNameWithoutExt}.jpeg`);

      // Für Small als WebP mit 512x512
      sharp(inputFilePath)
        .resize(512)
        .toFormat("webp")
        .toFile(`${outputDirs.small}/${fileNameWithoutExt}.webp`);
    }
  });
  console.log("\x1b[32m%s\x1b[0m", "All og images converted successfully!");
});
