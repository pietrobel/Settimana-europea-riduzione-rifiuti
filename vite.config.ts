import tailwindcss from '@tailwindcss/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import {createRequire} from 'module';
import path from 'path';
import {defineConfig} from 'vite';

const require = createRequire(import.meta.url);
const babelCore = require('@babel/core') as {
  transformAsync: (
    code: string,
    opts: Record<string, unknown>,
  ) => Promise<{code?: string | null} | null>;
};

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      tailwindcss(),
      legacy({
        targets: [
          'chrome >= 45',
          'samsung >= 4',
          'safari >= 10',
          'ios_saf >= 10',
          'defaults',
          'not IE 11',
        ],
        modernTargets: 'chrome >= 61, safari >= 11, firefox >= 60, edge >= 79',
        polyfills: true,
        modernPolyfills: true,
        renderLegacyChunks: true,
      }),
      {
        name: 'transpile-inline-index-scripts',
        apply: 'build',
        transformIndexHtml: {
          order: 'post',
          async handler(html: string): Promise<string> {
            const scriptRe = /(<script\b[^>]*\bid="serr-main-inline-script"[^>]*>)([\s\S]*?)(<\/script>)/i;
            const match = html.match(scriptRe);
            if (!match) {
              return html;
            }
            const result = await babelCore.transformAsync(match[2], {
              babelrc: false,
              configFile: false,
              sourceType: 'script',
              compact: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '45',
                      samsung: '4',
                      safari: '10',
                    },
                    bugfixes: true,
                  },
                ],
              ],
            });
            if (!result || !result.code) {
              return html;
            }
            return html.replace(match[0], () => `${match[1]}\n${result.code}\n${match[3]}`);
          },
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(import.meta.dirname, 'dist');
          const srcAssets = path.resolve(import.meta.dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    build: {
      sourcemap: false,
      cssMinify: true,
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
