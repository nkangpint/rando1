// Read the docs here: https://googlechrome.github.io/sw-toolbox/api.html

self.toolbox.router.get(/\?partial/, self.toolbox.fastest, {
	networkTimeoutSeconds: 5,
	cache: {
		name: 'partials',
		maxEntries: 100,
		maxAgeSeconds: 60 * 60 * 24 * 31
	}
});

self.toolbox.router.get(/fonts\.googleapis\.com/, self.toolbox.cacheFirst, {
	cache: {
		name: 'google-fonts',
		maxEntries: 10,
		maxAgeSeconds: 60 * 60 * 24 * 31
	}
});

self.toolbox.router.get(/fullstory\.com\/s\/fs\.js/, self.toolbox.cacheFirst, {
	cache: {
		name: 'fullstory',
		maxEntries: 1,
		maxAgeSeconds: 60 * 60 * 24
	}
});

self.toolbox.router.get(/maps\.googleapis\.com\/maps\/api\/staticmap/, self.toolbox.cacheFirst, {
	cache: {
		name: 'google-static-map',
		maxEntries: 10,
		maxAgeSeconds: 60 * 60 * 24
	}
});