const phonePattern = '(^$|^04[0-9]{2}\\s*[0-9]{3}\\s*[0-9]{3}|^[2-9][0-9]{2}-?[0-9]{3}-?[0-9]{4}|\\+.{11,})',
      phoneRegex = new RegExp(phonePattern),
      phoneFormat = (val, ctx) => {

        if(/^\+([^1]|$)/.test(val)) {
          val = val.replace(/[^+0-9]/g, '')
        } else {
          val = val.replace(/^\+?1|[^0-9]/g, '')
        }


        if(val.length) {
          switch (true) {
            case /^\+6/.test(val):

              if(val.length > 3) {
                if(ctx && /^\+61\s*0/.test(val) && (ctx._caretPosition || 0 > 3)) ctx._caretPosition = (ctx._caretPosition || 0) - 1

                val = val.slice(0, 3)
                  + ' '
                  + (
                    /^\+61/.test(val)
                      ? phoneFormat(('0' + val.slice(3)).replace(/^0+/, '0')).replace(/^0/, '')
                      : val.slice(3)
                  )
              }
              break;
            case /^\+/.test(val):
              break;
            case /^04/.test(val):
              if(val.length > 7) val = val.slice(0, 7) + ' ' + val.slice(7)
              if(val.length > 4) val = val.slice(0, 4) + ' ' + val.slice(4)
              break;
            case /^0/.test(val):
              if(val.length > 6) val = val.slice(0, 6) + ' ' + val.slice(6)
              if(val.length > 2) val = val.slice(0, 2) + ' ' + val.slice(2)
              break;
            default:
              if(val.length > 6) val = val.slice(0, 6) + '-' + val.slice(6)
              if(val.length > 3) val = val.slice(0, 3) + '-' + val.slice(3)
          }
        }
        return val
      }

export { phoneFormat, phonePattern, phoneRegex }
