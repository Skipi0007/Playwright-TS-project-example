import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		baseURL: 'https://directory.superdao.co/',
		headless: true,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'on-first-retry',
		screenshot: 'only-on-failure',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'Chromium',
			use: { browserName: 'chromium' },
		},
	],
	testDir: 'tests',
	reporter: [['line']],
	retries: 1,
	workers: 5,
};

export default config;
