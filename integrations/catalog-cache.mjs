/** @type {import('astro').AstroIntegration} */
export function catalogCacheInvalidation() {
  return {
    name: 'catalog-cache-invalidation',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'catalog-cache-invalidation',
                configureServer(server) {
                  const isCatalogFile = (file) => file.includes('content/catalog/');

                  const invalidate = (file) => {
                    if (!isCatalogFile(file)) return;

                    import('../src/lib/catalog-reader.ts')
                      .then((mod) => {
                        mod.clearCatalogCache();
                        server.config.logger.info(`catalog cache cleared (${file.split('content/catalog/')[1]})`);
                      })
                      .catch((error) => {
                        server.config.logger.warn(`catalog cache clear failed: ${error.message}`);
                      });
                  };

                  server.watcher.on('change', invalidate);
                  server.watcher.on('add', invalidate);
                  server.watcher.on('unlink', invalidate);
                },
              },
            ],
          },
        });
      },
    },
  };
}
