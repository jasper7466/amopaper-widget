const plugins = ['./node_modules/prettier-plugin-multiline-arrays'];

const pluginsConfigs = {
    // CodeGuide 7.1: Элементы массивов в декораторе модулей должны быть с новой строки (no-inline)
    // (расширено на все массивы в коде)
    'prettier-plugin-multiline-arrays': {
        multilineArraysWrapThreshold: 1,
    },
};

const prettierNativeConfig = {
    // CodeGuide 6.1: Отступ: 4 пробела
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    trailingComma: 'all',
    bracketSameLine: true,
    printWidth: 90,
};

const pluginsConfigConcat = () =>
    Object.values(pluginsConfigs).reduce(
        (result, current) => ({
            ...result,
            ...current,
        }),
        {}
    );

module.exports = {
    plugins,
    ...prettierNativeConfig,
    ...pluginsConfigConcat(),
};
