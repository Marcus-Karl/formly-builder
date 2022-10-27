const $RefParser = require("@apidevtools/json-schema-ref-parser");
const axios = require('axios').default;
const { existsSync, readFileSync, writeFileSync } = require('fs');

const run = async () => {
  const resolvers = {
    file: {
      order: 2,
      canRead: (file) => existsSync(file.url),
      read: (file) => {
        return readFileSync(file.url);
      }
    },
    https: {
      order: 3,
      canRead: (file) => /^https:\/\//i.test(file.url),
      read: async (file) => {
        return await axios.get(file.url);
      }
    },
    http: {
      order: 4,
      canRead: (file) => /^http:\/\//i.test(file.url),
      read: async (file) => {
        return await axios.get(file.url);
      }
    }
  };

  const workingDirectory = process.cwd();

  process.chdir(__dirname);

  const resolved = await $RefParser.bundle('schemas/json-schema-builder.schema.json', { resolve: resolvers });

  const schema = JSON.stringify(resolved, null, 2);

  writeFileSync(`../src/assets/schemas/builder-schema.json`, schema);

  process.chdir(workingDirectory);
};

(async () => {
  await run();
})();