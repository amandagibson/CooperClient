describe('BMI Converter', () => {
    beforeAll(async () => {
        jest.setTimeout(100000);
        await page.goto('http://localhost:3001');
    })

    beforeEach(async () => {
        await page.reload();
    });

    describe('Metric method', async () => {
        beforeEach( async () => {
            await page.select('select[id="method"]', 'metric')
            await page.type('input[name="weight"]', '95')
            await page.type('input[name="height"]', '186')
        })

        it('displays assesment', async () => {
            await expect(page).toMatch('You are Overweight')
        })

        it('displays BMI value', async () => {
            await expect(page).toMatch('BMI of 27.46')
        })
    })

    describe('Imperial method', async () => {
        beforeEach( async () => {
            await page.select('select[id="method"]', 'imperial')
            await page.type('input[name="weight"]', '200')
            await page.type('input[name="height"]', '73')
        })

        it('displays assesment', async () => {
            await expect(page).toMatch('You are Overweight')
        })

        it('displays BMI value', async () => {
            await expect(page).toMatch('BMI of 26.38')
        })
    })
});