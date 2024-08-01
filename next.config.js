const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const startTime = new Date();

module.exports = withBundleAnalyzer({
    webpack(config, { isServer }) {
        const endTime = new Date();
        const buildTime = (endTime - startTime) / 1000; // in seconds
        console.log(`Build time: ${buildTime} seconds`);

        return config;
    },
});