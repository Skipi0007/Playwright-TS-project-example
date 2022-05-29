import type { Page } from '@playwright/test';
import config from '../../playwright.config';

export class BasePage {
	readonly page: Page;
	protected pageUrl

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = config.use.baseURL
	}

	async open(pageUrl = this.pageUrl): Promise<void> {
		await this.page.goto(pageUrl);
		await this.waitForLoad()
	}

	async waitForLoad(
		state: 'load' | 'domcontentloaded' | 'networkidle' = 'load',
		timeout = 5000
	): Promise<void> {
		await this.page.waitForLoadState(state, { timeout });
	}

	async waitForNavigationLoad(
		state: 'load' | 'domcontentloaded' | 'networkidle' = 'load',
		timeout = 5000
	): Promise<void> {
		await this.page.waitForNavigation({ waitUntil: state, timeout });
	}
}
