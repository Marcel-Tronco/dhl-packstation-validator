import fetch from "node-fetch"

/**
 * Checks if a given string is numerical
 * @param { string } str - the string to be checked
 * @returns { boolean }
 */
const isAllNum = (str) => {
  if (
    typeof str === 'string' &&
    /^\d+$/.test(str)
  ) {
    return true
  }
  else {
    return false
  }
}

/**
 * Checks if a given string is a valid number for a Packstation
 * @param { string } packstationNumber
 * @returns { boolean }
 */
export const isValidPackstationNumber = (packstationNumber) => {
  if (
    isAllNum(packstationNumber) &&
    packstationNumber.length === 3
  ) {
    return true
  }
  else {
    return false
  }
}

/**
 * Checks if a given string is a german zip code
 * @param { string } zipCode
 * @returns { boolean}
 */

export const isValidZipCode = (zipCode) => {
  if (
    isAllNum(zipCode) &&
    zipCode.length === 5
  ) {
    return true
  }
  else {
    return false
  }
}

/**
 * Retrieve the json with addresses of Packstationen in the range of the zipCode
 * @param { string } zipCode - german zip code
 * @returns { object } returns the javascript representation of the json returned from the api
 */
const getAddressList = async (zipCode) => {

  if ( ! isValidZipCode(zipCode) ) {
    console.log("Got here")
    throw new Error("ZIPCODE ERROR: invalid input zipcode")
  }

  const url = `https://www.dhl.de/int-postfinder/postfinder_webservice/rest/v1/nearbySearch?address=${zipCode}&locationType=PACKSTATION`

  try {
    const response = await fetch(url)
    const addressList = await response.json()
    return addressList    
  } catch (error) {
    throw new Error(`API-ERROR: couldn't gather the list of Packstation\nActual Error: ${error}`)
  }
}

/**
 * Checks if a pair of PackstationNumber and zipCode match to a valid address.
 * @param { string } zipCode - german zip code of the Packstation
 * @param { string } packstationNumber - number of the Packstation
 * @returns { boolean }
 */
const isValidAddress = async (zipCode, packstationNumber) => {
  if (
    ! isValidZipCode(zipCode) ||
    ! isValidPackstationNumber(packstationNumber)
  ) {
    return false
  }
  try {
    const addressList = await getAddressList(zipCode)
    for (let ps of addressList.pfLocations) {
      if (ps.primaryKeyZipRegion 
        && ps.primaryKeyZipRegion === packstationNumber
        && ps.zipCode
        && ps.zipCode === zipCode
        ) {
          return true
        }
    }
    return false  
  } catch (error) {
    console.log(error)
  }
}

export default {
  listAddresses: getAddressList,
  isValidAddress
}