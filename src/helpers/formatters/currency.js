const currencyPattern = '^[0-9]+((\\.[0-9]{2})$|$)',
      currencyRegex = new RegExp(currencyPattern),
      currencyFormat = (val) => {
        val = `${val}`.replace(/[^0-9.]/g, '')
        if(/\./.test(val)) {
          val = val.split('.')
          val[1] = `${val[1]}00`.slice(0, 2)
          val = `${val[0] || '0'}.${val[1]}`
        } else {
          val = (val || '0') + '.00'
        }
        return val
      }

export { currencyFormat, currencyPattern, currencyRegex }
