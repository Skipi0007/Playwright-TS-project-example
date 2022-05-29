import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { Page, Locator } from '@playwright/test';

const filterBtnSelector = "button.jsx-630382402";
const grigSelector = 'a.table-row';

export class DirectoryPage extends BasePage {
	readonly mainContainer: Locator;
	readonly typeBtn: Locator;
	readonly searchField: Locator;
	readonly submitDao: Locator;
	readonly gridElement: Locator;
	readonly choosenType: Locator;
	readonly twitterBtn: Locator;
	readonly linkedBtn: Locator;
	readonly itemTypeBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.mainContainer = this.page.locator('div.max-w-full');
		this.typeBtn = this.page.locator('button.jsx-4038363794');
		this.searchField = this.page.locator('input.w-full');
		this.submitDao = this.page.locator('button.bg-yellow >> text=Submit DAO >> nth=1');
		this.gridElement = this.page.locator('a.table-row');
		this.choosenType = this.page.locator('button.jsx-4038363794 border-transparent');
		this.twitterBtn = this.page.locator('a.table-row >> nth=0 >> button.jsx-630382402 >> span.jsx-630382402 >> nth=1');
		this.linkedBtn = this.page.locator('a.table-row >> nth=0 >> button >> nth=0');
		this.itemTypeBtn = this.page.locator('a.table-row >> nth=0 >> button.jsx-606597713 >> span.jsx-606597713 >> nth=1');
	}

	async checkPageView(): Promise<void> {
		await this.waitForLoad();
		expect(await this.mainContainer.screenshot()).toMatchSnapshot('directory.png');
	}

	async clickFilterBtn(filterName: 'All' | 'Community' | 'Staking'): Promise<void> {
		
		await this.page.locator(`${filterBtnSelector} >> text=${filterName}`).waitFor({state: 'visible', timeout: 5000});
		await this.page.locator(`${filterBtnSelector} >> text=${filterName}`).click();
	}

	async ckeckFilterEnable(filterName: 'All' | 'Community' | 'Staking'): Promise<void> {
		let url: string;

	switch (filterName) {
		case 'All':
			url = '?filter=';
			break;
		case 'Community':
			url = '?filter=Community';
			break;
		case 'Staking':
			url = '?filter=Staking';
			break;
	}
		expect(this.page.url()).toContain(url);
		expect(this.page.locator(`${filterBtnSelector} >> text=${filterName} >> ..`)).toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
	}

	async ckeckIsElementsFiltered(filterName: 'All' | 'Community' | 'Staking'): Promise<void> {
		await this.waitForLoad('networkidle');
		const rowCount = await this.typeBtn.count();

		for (let i = 0; i < rowCount; i++) {
			expect(await this.typeBtn.nth(i).textContent()).toContain(filterName);
		}
	}

	async fillSearchField(text: string): Promise<void> {
		await this.searchField.type(text);
		await this.searchField.type(' ', {delay: 3000});

		await this.waitForLoad();
	}

	async checkSearchResult(text: string): Promise<void> {
		const rowCount = await this.gridElement.count();

		for (let i = 0; i < rowCount; i++) {
			expect(await this.gridElement.nth(i)).toContainText(RegExp(text, 'i'));
		}
	}

	async clickSubmitDao(): Promise<void> {
		await this.submitDao.click();
	}

	async catchDaoPage(): Promise<Page> {
		const [newPage] = await Promise.all([
			this.page.context().waitForEvent('page'),
			this.clickSubmitDao(),
			this.waitForLoad('networkidle')
		]);

		return newPage;
	}

	async checkNewPageUrl(newPage: Page, url: string): Promise<void> {
		expect(newPage.url()).toContain(url);
	}

	async checkPageUrl(url: string): Promise<void> {
		expect(this.page.url()).toContain(url);
	}

	async clickFirstGridItem(): Promise<void> {
		await this.gridElement.nth(0).click();
	}

	async clickTypeBtn(): Promise<void> {
		await this.waitForLoad('networkidle');
		await this.itemTypeBtn.click();
	}

	async returnTypeBtnText(): Promise<string> {
		return await this.itemTypeBtn.innerText();
	}

	async checkCurrentTypeContainText(text: string): Promise<void> {
		await this.waitForLoad();
		this.page.locator(`${filterBtnSelector} >> text=${text} >> ..`).waitFor({state: 'visible'});
		expect(this.page.locator(`${filterBtnSelector} >> text=${text} >> ..`)).toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
	}

	async clickTwitterBtn(): Promise<void> {
		await this.twitterBtn.click();
	}	

	async clickLinkedBtn(): Promise<void> {
		await this.linkedBtn.click();
	}	

	async catchTwitterPage(): Promise<Page> {
		await this.waitForLoad('networkidle')
		const [newPage] = await Promise.all([
			this.page.context().waitForEvent('page'),
			this.clickTwitterBtn(),
			this.waitForLoad()
		]);

		return newPage;
	}

	async catchLinkedPage(): Promise<Page> {
		const [newPage] = await Promise.all([
			this.page.context().waitForEvent('page'),
			this.clickLinkedBtn(),
		]);

		return newPage;
	}
}

