import { test as base } from '@playwright/test';
import { DirectoryPage } from '../pageObjects/DirectoryPage';

type TestFixtures = {
	// rowItemModal: RowItemModal;
	directoryPage: DirectoryPage;
};

const test = base.extend<TestFixtures>({
	// rowItemModal: async ({ page }, use) => {
	// 	const rowItemModal = new RowItemModal(page);

	// 	await use(rowItemModal);
	// },

	directoryPage: async ({ page }, use) => {
		const directoryPage = new DirectoryPage(page);

		await directoryPage.open();
		await use(directoryPage);
	},
});

export default test;
