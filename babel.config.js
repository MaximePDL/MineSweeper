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
                        Constants: './src/Constants/index.ts',
                        Components: './src/Components/index.ts',
                        Containers: './src/Containers/index.ts',
                    },
                },
            ],
        ],
    };
};
