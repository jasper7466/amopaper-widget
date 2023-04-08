const pluralize = require("pluralize");

const exceptions = ["data", "settings", "details"];

module.exports = {
  meta: {
    docs: {
      description: "Prefer singular TypeScript interface name parts.",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: null,
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const {
          id: { name },
        } = node;

        const nameParts = name.split(/(?=[A-Z])/);
        let invalidNameParts = [];

        for (const part of nameParts) {
          if (exceptions.includes(part.toLowerCase())) {
            continue;
          }

          if (pluralize.isPlural(part)) {
            invalidNameParts.push(part);
          }
        }

        if (invalidNameParts.length === 0) {
          return;
        }

        context.report({
          node,
          message: `Part(s) "${invalidNameParts.join(
            ", "
          )}" of interface '{{name}}' should be singular.`,
          data: { name },
        });
      },
    };
  },
};
