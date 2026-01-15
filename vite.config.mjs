import { createViteConfig } from "vite-config-factory";

const entries = {
	'js/attachment-revisions': './source/js/attachment-revisions.js',
	'css/attachment-revisions': './source/sass/attachment-revisions.scss',
};

export default createViteConfig(entries, {
	outDir: "assets/dist",
	manifestFile: "manifest.json",
});
