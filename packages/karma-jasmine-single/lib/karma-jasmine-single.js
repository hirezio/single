var createPattern = function (file) {
  return {
    pattern: file,
    included: true,
    served: true,
    watched: false,
  };
};

var initJasmineSingle = function (files) {
  const jasmineSingleFile = createPattern(require.resolve('@hirez_io/jasmine-single'));

  // Find "karma-jasmine" last file (adapter.js) to make sure
  // "jasmine" is loaded before "jasmine-single"
  const karmaJasmineAdapterFileIndex = files.findIndex((file) => {
    return file.pattern.indexOf('adapter.js') !== -1;
  });

  if (karmaJasmineAdapterFileIndex !== -1) {
    files.splice(karmaJasmineAdapterFileIndex + 1, 0, jasmineSingleFile);
  } else {
    files.unshift(jasmineSingleFile);
  }
};

initJasmineSingle.$inject = ['config.files'];

module.exports = {
  'framework:@hirez_io/jasmine-single': ['factory', initJasmineSingle],
  'framework:@hirez_io/karma-jasmine-single': ['factory', initJasmineSingle],
};
