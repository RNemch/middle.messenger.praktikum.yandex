declare module '*.pug' {
  import { compileTemplate } from 'pug';

  const template: compileTemplate;

  export default template;
}
