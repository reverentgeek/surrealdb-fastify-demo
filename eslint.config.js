import rg from "eslint-config-reverentgeek";

export default [
  ...rg.configs[ "node-esm" ],
  ...rg.configs.blog,
  {
    rules: {
      "n/no-unpublished-import": [ "error", {
        allowModules: [ "eslint-config-reverentgeek" ]
      } ]
    }
  }
];
