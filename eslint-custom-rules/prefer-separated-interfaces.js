module.exports = {
  meta: {
    docs: {
      description: "Prefer separate file for each interface declaration.",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: null,
  },
  create(context) {
    let targetCount = 0;
    let totalCount = 0;

    function check(node) {
      const isNotOne = targetCount > 0 && totalCount !== 1;

      if (isNotOne) {
        context.report({
          node,
          message: "Each interface must be declared in a separate file.",
        });
      }
    }

    function countTarget(node) {
      targetCount++;
      totalCount++;

      check(node);
    }

    function countOther(node) {
      totalCount++;

      check(node);
    }

    function resetCounters() {
      targetCount = 0;
      totalCount = 0;
    }

    return {
      Program: resetCounters,

      TSInterfaceDeclaration: countTarget,

      TSEnumDeclaration: countOther,
      TSTypeAliasDeclaration: countOther,

      FunctionDeclaration: countOther,
      FunctionExpression: countOther,
      ArrowFunctionExpression: countOther,
      StaticBlock: countOther,
      BlockStatement: countOther,
      ForStatement: countOther,
      ForInStatement: countOther,
      ForOfStatement: countOther,
      SwitchStatement: countOther,
      VariableDeclaration: countOther,
      ClassDeclaration: countOther,
      ClassExpression: countOther,
    };
  },
};
