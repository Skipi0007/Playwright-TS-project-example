import test from './directory.fixture';

test.describe('Директория', () => {
	test('Пользователь страницу директорий -> страница загружается', async ({
		directoryPage,
	}) => {
		await directoryPage.checkPageView();
	});

	test('Пользователь кликает по ячейке продукта -> Переход на страницу с подробностями продукта', async ({
		directoryPage,
	}) => {
		await directoryPage.clickFirstGridItem();
		await directoryPage.checkPageUrl('/directory/');
	});

	test('Пользователь кликает по кнопке твиттера в ячейке с продуктом -> Переход в аккаунт продукта', async ({
		directoryPage,
	}) => {	
		const twitterPage = await directoryPage.catchTwitterPage();

		await directoryPage.checkNewPageUrl(twitterPage, 'twitter.com');
	});

	test('Пользователь кликает по кнопке страницы в ячейке с продуктом -> Переход в сайту продукта', async ({
		directoryPage,
	}) => {
		const linkedPage = await directoryPage.catchLinkedPage();

		await directoryPage.checkNewPageUrl(linkedPage, 'trustwallet.com');
	});

	test('Пользователь кликает кнопке типа в продукте -> Включается фильтр по данному типу', async ({
		directoryPage,
	}) => {
		const typeName = await directoryPage.returnTypeBtnText();
		
		await directoryPage.clickTypeBtn();
		setTimeout(() => {
			directoryPage.checkCurrentTypeContainText(typeName);
		}, 500); 
	});

	test('Пользователь ставит Community фильтр -> фильтр отображается в урле', async ({
		directoryPage,
	}) => {
		await directoryPage.clickFilterBtn('Community');
		await directoryPage.ckeckFilterEnable('Community');
	});

	test('Пользователь ставит Community фильтр -> элементы списка отфильтрованы', async ({
		directoryPage,
	}) => {
		await directoryPage.clickFilterBtn('Community');
		await directoryPage.ckeckIsElementsFiltered('Community');
	});

	test('Пользователь вводит текст в строку поиска -> в списке результатов только элементы содержащие текст запроса', async ({
		directoryPage,
	}) => {
		const searchReqText = 'trust wallet'

		await directoryPage.fillSearchField(searchReqText);
		setTimeout( () => {directoryPage.checkSearchResult(searchReqText)}, 3000);
	});

	test('Пользователь кликает по кнопе Submit DAO -> Переход на страницу suggest us as DAO', async ({
		directoryPage,
	}) => {
		const daoPage = await directoryPage.catchDaoPage();

		await directoryPage.checkNewPageUrl(daoPage, 'airtable.com');
	});
});
