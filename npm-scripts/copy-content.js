import fs from "fs";
import path from "path";

const sourceDir = "./cms/content/blog"; // Pfad zum cms-Ordner
const targetDir = "./src/content/blog"; // Zielordner in Astro

// Überprüfen, ob der Zielordner existiert, andernfalls erstellen
if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

const replaceImageExtensions = (content) => {
	return content.replace(/\.(png|jpeg|jpg)/g, ".webp");
};

const replaceFilePath = (content) => {
	return content.replace("images/blog/", "./../../images/blog/");
};

// Funktion zum Kopieren der Dateien
const copyFiles = (src, dest) => {
	const files = fs.readdirSync(src);

	files.forEach((file) => {
		const srcFile = path.join(src, file);
		const destFile = path.join(dest, file);

		// // Lese den Inhalt der Datei
		// let content = fs.readFileSync(srcFile, "utf8");
		// // Ersetze die Bildendungen
		// content = replaceImageExtensions(content);

		// // Schreibe den geänderten Inhalt in die Zieldatei
		// fs.writeFileSync(destFile, content);

		// Prüfe die Zeitstempel der Dateien
		if (
			!fs.existsSync(destFile) ||
			fs.statSync(srcFile).mtime > fs.statSync(destFile).mtime
		) {
			// Lese den Inhalt der Quelldatei
			let content = fs.readFileSync(srcFile, "utf8");
			// Ersetze die Bildendungen
			content = replaceImageExtensions(content);
			// content = replaceFilePath(content);

			// Schreibe den geänderten Inhalt in die Zieldatei
			fs.writeFileSync(destFile, content);
		}

		// Kopiere die Datei
		// fs.copyFileSync(srcFile, destFile);
	});
	console.log("\x1b[32m%s\x1b[0m", "All posts copied!");
};

// Führe die Kopierfunktion aus
copyFiles(sourceDir, targetDir);
