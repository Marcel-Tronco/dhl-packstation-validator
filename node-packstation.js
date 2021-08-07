import fetch from "node-fetch"

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