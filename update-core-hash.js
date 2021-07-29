/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs').promises;
const execa = require('execa');

(async () => {
  try {
    const coreFileName = 'shared/single-core/single-core.ts';
    const jestCacheOfHashFileName = 'packages/jest-single/.core-version';
    const jasmineCacheOfHashFileName = 'packages/jasmine-single/.core-version';

    const {stdout} = await execa('git', ['hash-object', coreFileName]);
    const latestCoreHash = stdout;
    
    const jestCachedHash = await fs.readFile(jestCacheOfHashFileName, 'utf8');
    const jasmineCachedHash = await fs.readFile(jasmineCacheOfHashFileName, 'utf8');

    if (jestCachedHash === latestCoreHash && jasmineCachedHash === latestCoreHash) {
      console.log('No changes in single-core');
      return;
    }

    await fs.writeFile(jestCacheOfHashFileName, latestCoreHash);
    await fs.writeFile(jasmineCacheOfHashFileName, latestCoreHash);

    console.log(
      'Updated single-core hash to help lerna know that it needs to bump versions'
    );

    // await execa('git', ['add', jestCacheOfHashFileName, jasmineCacheOfHashFileName]);

    // const { stdout } = await execa('git', ['commit', '--amend', '--no-edit']);
    console.log(stdout);
  } catch (error) {
    console.error(error);
  }
})();
