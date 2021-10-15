# DHL Packstation validation

## Description
This package helps to validate the address of a Packstation of DHL by its Number and the zip code. It also allows to retrieve a list of Packstationen close to the location of a zip code.

## Usage
### Packstation Address Validation
```
import { isValidAddress } from 'dhl-packstation-validation'

isValidAddress(<your zip code>, <your packstation number>).then((isValid) =>
 if (isValid) {
   // do something
 }
)
```
### Retrieve List of Packstationen

```
import { listAddresses } from 'dhl-packstation-validation'

listAddresses(<your zip code>).then((list) => {
  // do something with the list
})

```
### Status of the package

There are weekly tests that check if the package still matches the DHL api...

[![Check for DHL-API-Changes](https://github.com/Marcel-Tronco/dhl-packstation-validator/actions/workflows/check_for_api_changes.yaml/badge.svg)](https://github.com/Marcel-Tronco/dhl-packstation-validator/actions/workflows/check_for_api_changes.yaml)