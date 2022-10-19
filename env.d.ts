/// <reference types="vite/client" />
declare module "@grapecity/spread-sheets-vue"
declare module "@grapecity/spread-sheets-designer-vue"
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.scss" {
  const sass: any
  export default sass
}
