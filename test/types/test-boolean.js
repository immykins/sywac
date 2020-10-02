'use strict'

const tap = require('tap')
const Api = require('../../api')

const parent = require('path').basename(__filename, '.js')
const helper = require('../helper').get(parent)
const assertNoErrors = helper.assertNoErrors.bind(helper)

tap.test('array > via specific api methods', async t => {
  const result = await Api.get()
    .boolean('-b, --bool')
    .boolean('-b2, -bool')
    .parse('-b true -b2 false')

  assertNoErrors(t, result)

  t.same(result.details.args, [
    '-b', 'true', '-b2', 'false'
  ])

  t.equal(result.argv.b, true)
  t.equal(result.argv.b2, false)
})

tap.test('array > via generic api method', async t => {
  const result = await Api.get()
    .option('--bool', { type: 'boolean' })
    .option('--bool2', { type: 'boolean' })
    .parse('--bool true --bool2 false')

  assertNoErrors(t, result)

  t.same(result.details.args, [
    '--bool', 'true', '--bool2', 'false'
  ])

  t.equal(result.argv.bool, true)
  t.equal(result.argv.bool2, false)
})
