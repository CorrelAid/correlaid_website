const {preprocess} = require('svelte/compiler');

module.exports = async function transformer(file, api, options) {
  const j = api.jscodeshift;

  function removeConsole(temp) {
    temp
      .find(j.CallExpression, {
        callee: {
          type: 'MemberExpression',
          object: {type: 'Identifier', name: 'console'},
          property: {type: 'Identifier', name: 'log'},
        },
      })
      .remove();
    return temp;
  }

  const extension = file.path.split('.').pop();

  if (extension === 'svelte') {
    options.extensions = 'svelte';
    const {code} = await preprocess(file.source, {
      markup: () => {},
      script: ({content}) => {
        const root = removeConsole(j(content));

        return {
          code: root.toSource(),
        };
      },
    });
    return code;
  } else {
    options.extensions = 'js';

    const root = removeConsole(j(file.source));

    return root.toSource();
  }
};
