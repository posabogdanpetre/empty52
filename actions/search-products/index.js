// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Morning Muse Light Roast',
        description: 'A light roast with bright, citrusy notes and a smooth finish.',
        image_url: 'https://frescopa.coffee/media_1990fe27244fdc5d261155cd983f85a56415baf1c.jpg?width=750&format=jpg&optimize=medium',
        category: 'Bagged Coffee'
    },
    {
        name: 'Coffee Machines',
        description: 'Top-of-the-line coffee machines for brewing at home.',
        image_url: 'https://frescopa.coffee/media_18d90d06cb150321e2b7de19e82a9818c57b1eaaa.png?width=750&format=png&optimize=medium',
        category: 'Coffee Machines'
    },
    {
        name: 'Bagged Coffee',
        description: 'Freshly roasted whole bean and ground coffee in bags.',
        image_url: 'https://frescopa.coffee/media_11f2acc820929d908638cf3f7f133c5ac9792a560.png?width=750&format=png&optimize=medium',
        category: 'Bagged Coffee'
    },
    {
        name: 'Coffee Pods',
        description: 'Single-serve coffee pods for quick, convenient brewing.',
        image_url: 'https://frescopa.coffee/media_1611a15fc05b259399fa254f961f08b9f7804cd23.png?width=750&format=png&optimize=medium',
        category: 'Coffee Pods'
    },
    {
        name: 'Bundles',
        description: 'Curated coffee and equipment bundles.',
        image_url: 'https://frescopa.coffee/media_1b4036e97de71a31f998526cf47deb2999dbaee87.png?width=750&format=png&optimize=medium',
        category: 'Bundles'
    },
    {
        name: 'Accessories',
        description: 'Brewing accessories and coffee gear.',
        image_url: 'https://frescopa.coffee/media_1ad953e2b8b4f9e3e3f11e8fb8cedeca7a5ab2343.png?width=750&format=png&optimize=medium',
        category: 'Accessories'
    }
]

module.exports = async ({ category = '', query = '' } = {}) => {
    const cat = typeof category === 'string' ? category.trim() : ''
    const q = typeof query === 'string' ? query.trim().toLowerCase() : ''

    const results = MOCK_DATA.filter((item) => {
        if (cat && item.category !== cat) return false
        if (q) {
            const haystack = `${item.name} ${item.description}`.toLowerCase()
            if (!haystack.includes(q)) return false
        }
        return true
    })

    let summary
    if (results.length === 0) {
        summary = `No products found${cat ? ` in ${cat}` : ''}${q ? ` matching "${query.trim()}"` : ''}.`
    } else {
        const scope = cat ? ` in ${cat}` : ''
        const match = q ? ` matching "${query.trim()}"` : ''
        summary = `Found ${results.length} product${results.length === 1 ? '' : 's'}${scope}${match}: ${results.map((r) => r.name).join(', ')}.`
    }

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&query=${query}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.set('category', category)
 *   if (query) params.set('query', query)
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
