const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ post_code: '94103' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Find a Fréscopa location near me" returns store locations', async () => {
        const out = await handler({ post_code: '94103' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ post_code: '94103' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('returns error message when post_code is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/post_code|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('each store includes the expected fields', async () => {
        const out = await handler({ post_code: '94110' })
        out.structuredContent.stores.forEach((store) => {
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('hours')
        })
    })
})
