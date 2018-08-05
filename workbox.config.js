module.exports = {
  swDest: 'workbox-worker.js',
  importWorkboxFrom: 'local',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [{
    // Match any same-origin request that contains 'api'.
    urlPattern: '/bs-config',
    // Apply a network-first strategy.
    handler: 'staleWhileRevalidate',
    options: {
      // Fall back to the cache after 10 seconds.
      // networkTimeoutSeconds: 10,
      // Use a custom cache name for this route.
      cacheName: 'my-api-cache',
      // Configure custom cache expiration.
      expiration: {
        maxEntries: 5,
        maxAgeSeconds: 60,
      },
      // Configure which responses are considered cacheable.
      cacheableResponse: {
        statuses: [0, 200],
        headers: {'x-test': 'true'},
      },
      // Configure the broadcast cache update plugin.
      broadcastUpdate: {
        channelName: 'my-update-channel',
      },
      // Add in any additional plugin logic you need.
      plugins: [
        // {cacheDidUpdate: () => /* custom plugin code */}
      ],
    },
  }, {
    // To match cross-origin requests, use a RegExp that matches
    // the start of the origin:
    urlPattern: new RegExp('^https://cors\.example\.com/'),
    handler: 'staleWhileRevalidate',
    options: {
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  }]
}
