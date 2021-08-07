import assert from "assert"
import expect from 'expect.js'
import nodePackstation, {isValidZipCode, isValidPackstationNumber} from "../node-packstation.js"

const isValidAddress = nodePackstation.isValidAddress
const listAddresses = nodePackstation.listAddresses

describe('Test all functions', function() {
  describe('Test list retrieval', function() {
    it('Simple list can be gathered', async function() {
      const result = await listAddresses("10115")
      expect(result).to.only.have.keys('pfLocations', 'centerOfSearch');
      expect(result.pfLocations.length).to.be.greaterThan(0);
    })
   })
  describe('basic validity checks', function(){
    it('ZipCode: 5 characters, all digits', function(){
      assert.strictEqual(isValidZipCode("10000"), true)
      assert.strictEqual(isValidZipCode("100000"), false)
      assert.strictEqual(isValidZipCode("1000"), false)
      assert.strictEqual(isValidZipCode("1000!"), false)
      assert.strictEqual(isValidZipCode("1000a"), false)
      assert.strictEqual(isValidZipCode("asdf"), false)
    })
    it('PackstationNumber: all digits', function(){
      assert.strictEqual(isValidPackstationNumber("200"), true)
      assert.strictEqual(isValidPackstationNumber("asd"), false)
      assert.strictEqual(isValidPackstationNumber("20a"), false)
      assert.strictEqual(isValidPackstationNumber("20!"), false)
    })
  })
  describe('Test address validation', async function() {
    it('Simple address can be verified', async function() {
      const result = await isValidAddress("10115", "535")
      assert.strictEqual(result, true)
    })
    it('Wrong address pair can be falsified', async function() {
      const result = await isValidAddress("10117", "535")
      assert.strictEqual(result, false)
     })
    it('Faulty format returns false', async function() {
      const result = await isValidAddress("asdf", "535")
      assert.strictEqual(result, false)
    })
  })
})
//isValidAddress("10437", "a08").then((result) => console.log(result))
//listAddresses('!2312').then((result)=> console.log(result)
