const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Morning Muse Light Roast' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the Morning Muse Light Roast" returns product details', async () => {
        const out = await handler({ name: 'Morning Muse Light Roast' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Morning Muse Light Roast/)
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe('Morning Muse Light Roast')
        expect(out.structuredContent.category).toBe('Bagged Coffee')
    })

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ name: 'Morning Muse Light Roast' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('description')
        expect(out.structuredContent).toHaveProperty('image_url')
    })

    test('returns error message when required name is missing', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product name returns not-found and no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Blend 9000' })
        expect(out.content[0].text).toMatch(/no product details found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
