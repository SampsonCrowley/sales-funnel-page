import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  emailPattern,
  emailRegex,
  phonePattern,
  phoneRegex,
  phoneFormat,
  currencyPattern,
  currencyRegex,
  currencyFormat,
} from "helpers/formatters"

function filterKeys(obj = {}, keys = []){
  if(Array.isArray(obj)) return obj.filter((v) => !keys.includes(v))

  const filteredProps = {}
  for(let k in obj) {
    if(!keys.includes(k) && obj.hasOwnProperty(k)) filteredProps[k] = obj[k]
  }
  return filteredProps
}

function allowedBlank(props, value) {
  return !!(!props.required && (String(value) === ''))
}

/**
 * input tag with built in helper functions and easier validation
 * @type {object}
 * @property {String|Element} label - Input Label
 * @property {String} id - Input Id
 * @property {String} name - Input Name
 * @property {Function} onChange - Run on input change
 * @property {String} type - Input type
 * @property {Boolean} uncontrolled - use an uncontrolled input
 * @property {Boolean} useCurrencyFormat - Automagically format money numbers and add pattern checking
 * @property {Boolean} useEmailFormat - Strict Pattern parse email
 * @property {Boolean} usePhoneFormat - Automagically formats phone number and adds pattern checking
 * @property {Boolean} usePhoneFormatOnBlur - Automagically formats phone number and adds pattern checking onBlur
 * @property {String} badFormatMessage - Message to add to tooltip on bad format
 * @property {String|Element} feedback - Feedback to show on Input focus
 * @property {String|Boolean|Number} value - Input value
 * @property {(RegExp|Function)} validator - Validate input aginst regex or function
 */
export class TextField extends PureComponent {
  /**
   * @type {Array}
   */
  static specialKeys = Object.freeze(["badFormatMessage", "caretIgnore", "onChange", "pattern", "looseCasing", "useEmailFormat", "usePhoneFormat", "usePhoneFormatOnBlur", "useCurrencyFormat", "validator"])

  /**
   * Get correct pattern and validator on prop change
   * @type {Function}
   * @param {object} props - next props
   * @param {object} prevState - previous state
   */
  static getDerivedStateFromProps(props, prevState) {
    if(props.useEmailFormat || props.usePhoneFormat || props.useCurrencyFormat) {
      const regexToUse = props.useEmailFormat ? emailRegex : (props.usePhoneFormat ? phoneRegex : currencyRegex),
            badMessage = props.badFormatMessage || (props.useCurrencyFormat ? 'Invalid Amount' : `Invalid ${props.useEmailFormat ? 'Email' : 'Phone'} Format`)

      return {
        pattern: (props.useEmailFormat ? emailPattern : (props.usePhoneFormat ? phonePattern : currencyPattern)),
        validator: (ev) => (allowedBlank(props, ev.target.value) || regexToUse.test(ev.target.value)) ? '' : badMessage
      }
    } else if(props.validator instanceof RegExp) {
      return {
        validator: void(0),
        pattern: props.validator
      }
    } else {
      return {
        validator: props.validator,
        pattern: props.pattern
      }
    }

  }

  constructor(props) {
    super(props)

    this.state = {}

    this._specialKeys = this.constructor.specialKeys
    this._rawStr = '';
    this._caretPosition = 0;
  }

  /**
   * Make sure Caret Position is correct on modified input values
   * @type {Function}
   * @param {object} prevProps - used to check for ignored characters
   */
  componentDidUpdate ({ value, caretIgnore, usePhoneFormat, useCurrencyFormat, looseCasing }) {
    if(this.inputRef && (this.inputRef.type === 'email')) return;
    if(usePhoneFormat) caretIgnore = String(caretIgnore || '') + (/^\+/.test(String(this.props.value || '')) ? '\\s' : (/^0/.test(String(this.props.value || '')) ? '+\\s' : '+-'))
    if(useCurrencyFormat) caretIgnore = '^0-9.'

    if (this._caretPosition && (this.props.value !== value)) {
      let str, val, index, caretStr = caretIgnore ? `[${caretIgnore}]` : false


      str = this._rawStr.substr(0, this._caretPosition);
      val = String(this.props.value)

      if(looseCasing) {
        if(typeof looseCasing === 'string') {
          val = val[looseCasing]()
          str = str[looseCasing]()
        } else {
          val = val.toLowerCase()
          str = str.toLowerCase()
        }
      }

      try {
        if(str && caretStr) {
          console.log(caretStr)
          let regex = new RegExp(caretStr, 'g'),
              splitReg = new RegExp(str.replace(regex, '').split('').map((v) => v.replace(/\+/, '\\+')).join(`(${caretStr})?`)),
              matches = str.match(regex) || [],
              effectiveString = String((val.match(splitReg) || [])[0]),
              effectiveMatches = (effectiveString.match(regex) || []).length

          index = val.indexOf(effectiveString) + this._caretPosition + (effectiveMatches - matches.length);
        } else {
          index = val.indexOf(str) + this._caretPosition;
        }
      } catch(err) {
        console.error(err)
        index = val.indexOf(str) + this._caretPosition;
      }

      if (index !== -1) {
        this.setSelection(this.inputRef, () => {
          this.inputRef.selectionStart = this.inputRef.selectionEnd = index;
        })
      }
    }
  }

  setSelection(el, func) {
    if(/date|email/.test(String(el.type || ''))) return;

    try {
      const ogType = el.type || 'text',
            needsChange = !(/text|search|password|tel|url/.test(ogType))

      if(needsChange) el.type = 'text'
      func(el)
      if(needsChange) el.type = ogType
    } catch(err) {
      console.log(err)

      el.type = this.props.type || 'text'
    }
  }

  /**
   * Set Caret Position where applicable, format phone numbers and call onChange
   * for props
   * @type {Function}
   * @param {event} ev - synthetic change event
   */
  onChange(ev) {

    this.setSelection(ev.target, (el) => {
      this._caretPosition = Number(el.selectionEnd);
    })

    this._rawStr = String(ev.target.value);

    if(this.props.usePhoneFormat) ev.target.value = phoneFormat(ev.target.value, this)

    if(this.props.onChange) this.props.onChange(ev)
    if(this.state.validator) ev.target.setCustomValidity(this.state.validator(ev))
  }

  /**
   * format emails and money on blur since selectionRange is not applicable
   * call props.onBlur if set
   * @type {Function}
   * @param {event} ev - synthetic change event
   */
  onBlur(ev) {
    const value = ev.target.value
    if(this.props.useEmailFormat) {
      ev.target.value = String(value || '').toLowerCase()
      this.onChange(ev)
    } else if(this.props.useCurrencyFormat) {
      ev.target.value = allowedBlank(this.props, value) ? value : currencyFormat(String(value || '0'))
      this.onChange(ev)
    } else if (this.props.usePhoneFormatOnBlur) {
      ev.target.value = phoneFormat(ev.target.value, this)
    }
    //  else if(this.props.usePhoneFormat) {
    //   ev.target.value = phoneFormat(ev.target.value)
    //   this.onChange(ev)
    // }
    if(this.props.onBlur) this.props.onBlur(ev)
  }

  focus = () => this.inputRef && this.inputRef.focus()

  inputRef = (el) => this.inputEl = el

  render(){
    const {
      label = '',
      name,
      id = name,
      type = 'text',
      feedback = '',
      value,
      skipExtras = false,
      uncontrolled = false,
      ...props
    } = filterKeys(this.props, this._specialKeys)

    if(this.state.pattern) props.pattern = this.state.pattern
    if(this.props.useEmailFormat || this.props.useCurrencyFormat || this.props.usePhoneFormatOnBlur) props.onBlur = (ev) => this.onBlur(ev)

    const input = (
      <input
        key={`${id}.input`}
        ref={this.inputRef}
        name={name}
        id={id}
        type={type}
        onChange={(ev) => this.onChange(ev)}
        {...(uncontrolled ? {} : {value})}
        {...props}
      />
    )

    return skipExtras ? input : (
      <>
        <label key={`${id}.label`} htmlFor={id}>{label}</label>
        { input }
        <small key={`${id}.feedback`} className="form-control-focused">
          {feedback}
        </small>
      </>
    )
  }
}
