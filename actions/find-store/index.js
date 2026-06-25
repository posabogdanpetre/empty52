// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Fréscopa Downtown',
        address: '128 Market Street, San Francisco, CA 94103',
        phone: '(415) 555-0182',
        hours: 'Mon–Fri 7am–7pm · Sat–Sun 8am–5pm'
    },
    {
        name: 'Fréscopa Riverside',
        address: '47 Embarcadero Plaza, San Francisco, CA 94111',
        phone: '(415) 555-0247',
        hours: 'Daily 6:30am–8pm'
    },
    {
        name: 'Fréscopa Mission',
        address: '903 Valencia Street, San Francisco, CA 94110',
        phone: '(415) 555-0319',
        hours: 'Mon–Sun 7am–9pm'
    }
]

module.exports = async ({ post_code = '' } = {}) => {
    if (!post_code || typeof post_code !== 'string' || !post_code.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a post_code to find nearby Fréscopa locations.' }],
            // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
            structuredContent: { stores: [] }
        }
    }

    const query = post_code.trim()

    // TODO: Replace MOCK_DATA lookup with a real API call keyed on the post_code.
    // For now, return all mock locations regardless of post_code.
    const stores = MOCK_DATA

    const summary = stores.length > 0
        ? `Found ${stores.length} Fréscopa location${stores.length === 1 ? '' : 's'} near ${query}.`
        : `No Fréscopa locations found near ${query}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
        structuredContent: { stores }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?post_code=${post_code}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?post_code=${encodeURIComponent(post_code)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
