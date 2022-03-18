let refreshServer = {
    name: "refresh-server",
    setup(build) {
        build.onEnd((result) => {
            if (build.initialOptions.incremental) {
                // console.log(`refresh-server: Clearing Cache for ${build.initialOptions.entryPoints.join(", ")}...`);
                console.log(`Building ${new Date().toISOString()}`);
                // Remove all items from the cache (this will force node to reload all of the built artifacts)
                Object.keys(require.cache).forEach(function (key) {
                    const resolvedPath = require.resolve(key);
                    if (resolvedPath.includes(build.initialOptions.outdir)) {
                        delete require.cache[key];
                    }
                });
            }
        });
    },
};
module.exports = [refreshServer];