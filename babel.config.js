const { stringify } = require('querystring');

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        constants: './src/constants/index.ts',
                        types: './src/types/index.ts',
                        components: './src/components/index.ts',
                        containers: './src/containers/index.ts'
                    }
                }
            ]
        ]
    };
};
