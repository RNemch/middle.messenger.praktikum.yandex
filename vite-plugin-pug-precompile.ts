import { PluginOption } from 'vite';
const pug = require('pug');

export default function vitePluginPugPrecompile(): PluginOption {
  return {
    name: 'vite-plugin-pug-precompile',
    transform(code: string, id: string): { code: string } | undefined {
      if (id.endsWith('.pug')) {
        return {
          code: `
                    ${pug.compileClient(code, { basedir: __dirname })};
                    
                    export default template;
                    `,
        };
      }
    },
  };
}
