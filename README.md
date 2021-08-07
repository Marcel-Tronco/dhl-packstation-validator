# DHL Packstation validation

## Description
This package helps to validate the address of a Packstation of DHL by its Number and the zip code. It also allows to retrieve a list of Packstationen close to the location of a zip code.

## Usage
### Packstation Address Validation
```
import { isValidAddress } from 'dhl-packstation-validation'

if (isValidAddress(<your zip code>, <your packstation number>)) {
  // do something
}
```
### Retrieve List of Packstationen

```
import { listAddresses } from 'dhl-packstation-validation'

listAddresses(<your zip code>).then((list) => {
  // do something with the list
})

```
