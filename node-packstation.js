const fetch = require('node-fetch')

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

const isValidPackstationNumber = (packstationNumber) => {
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

const isValidZipCode = (zipCode) => {
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

const getAddressList = async (zipCode) => {

  if ( ! isValidZipCode ) throw new Error("ZIPCODE ERROR: invalid input zipcode")

  url = `https://www.dhl.de/int-postfinder/postfinder_webservice/rest/v1/nearbySearch?address=${zipCode}&locationType=PACKSTATION`

  try {
    addressList = await fetch(url)
    return addressList    
  } catch (error) {
    throw new Error("API-ERROR: couldn't gather the list of Packstation")
  }
}


const isValidAddress = (zipCode, packstationNumber) => {
  if (
    ! isValidZipCode ||
    !  isValidPackstationNumber
  ) {
    return false
  }
  addressList = getAddressList(zipCode)
  for (ps of addressList) {
    if (ps.primaryKeyZipRegion 
      && ps.primaryKeyZipRegion === packstationNumber
      && ps.zipCode
      && ps.zipCode === zipCode
      ) {
        return true
      }
  }
  return false
}

export default {
  listAddresses: getAddressList,
  isValidAddress
}