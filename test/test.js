const assert = require('assert')
const expect = require('expect.js')
const { isValidZipCode, isValidPackstationNumber, isValidAddress, listAddresses } = require('../node-packstation')
console.log(isValidZipCode)


describe('Test all functions', function() {
  this.timeout(10000)
  describe('Test list retrieval', function() {
    it('Simple list can be gathered and has expected form', async function() {
      const result = await listAddresses('10115')
      expect(result).to.have.key('pfLocations');
      expect(result.pfLocations[0]).to.have.keys('zipCode', 'primaryKeyZipRegion')
    })
   })
  describe('basic validity checks', function(){
    it('ZipCode: 5 characters, all digits', function(){
      assert.strictEqual(isValidZipCode('10000'), true)
      assert.strictEqual(isValidZipCode('100000'), false)
      assert.strictEqual(isValidZipCode('1000'), false)
      assert.strictEqual(isValidZipCode('1000!'), false)
      assert.strictEqual(isValidZipCode('1000a'), false)
      assert.strictEqual(isValidZipCode('asdf'), false)
    })
    it('PackstationNumber: all digits', function(){
      assert.strictEqual(isValidPackstationNumber('200'), true)
      assert.strictEqual(isValidPackstationNumber('asd'), false)
      assert.strictEqual(isValidPackstationNumber('20a'), false)
      assert.strictEqual(isValidPackstationNumber('20!'), false)
    })
  })
  describe('Test address validation', function() {
    it('Simple address can be verified', async function() {
      const result = await isValidAddress('10115', '535')
      assert.strictEqual(result, true)
    })
    it('Wrong address pair can be falsified', async function() {
      const result = await isValidAddress('10117', '535')
      assert.strictEqual(result, false)
     })
    it('Faulty format returns false', async function() {
      const result = await isValidAddress('asdf', '535')
      assert.strictEqual(result, false)
    })
  })
})