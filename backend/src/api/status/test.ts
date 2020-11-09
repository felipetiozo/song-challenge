import func from './func'
import assert from 'assert'

describe('GET /status', () => {
  it('should return some specific keys', async () => {
    const resp = await func()
    assert.strictEqual(resp.status, 'alive')
    assert(resp.now)
    assert.strictEqual(resp.mongo, 'connected')
  })
})
