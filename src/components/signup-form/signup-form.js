import { PureComponent } from "react"
import { TextField } from "./text-field"
import { ExecutionContext } from "contexts/execution"

export class SignupForm extends PureComponent {
  static contextType = ExecutionContext

  constructor(props) {
    super(props)
    this.state = { full_name: "", email: "", phone: "" }
    this.idPrefix = Math.random().toString(16).slice(-4) + (+new Date()).toString(16)
    this.fakeAutoComplete = `false ${(new Date())}`
  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onTextFieldChange = (ev) => {
    const target = ev.currentTarget
    this.onChange(target.name, target.value || "")
  }

  genId = (id) => `${this.idPrefix}_${id}`

  render() {
    const { isClient } = this.context || {}

    return (
      <form className="row" action="">
        <div className="col-6 mb-3">
          <TextField
            label="Full Name"
            id={this.genId("full_name")}
            name="full_name"
            type="text"
            className="form-control"
            placeholder="John Smith"
            feedback="Please enter your full name"
            value={this.state.full_name}
            onChange={this.onTextFieldChange}
            useEmailFormat
            required
            disabled={!isClient}
          />
        </div>
        <div className="col-6 mb-3">
          <TextField
            label="Email"
            id={this.genId("email")}
            name="email"
            type="text"
            className="form-control"
            placeholder="john-smith@gmail.com"
            feedback="The best email address to reach you"
            value={this.state.email}
            onChange={this.onTextFieldChange}
            useEmailFormat
            required
            disabled={!isClient}
          />
        </div>
        <div className="col-6 mb-3">
          <TextField
            label="Phone"
            id={this.genId("phone")}
            name="phone"
            type="text"
            className="form-control"
            inputMode="numeric"
            placeholder="202-555-0172"
            feedback="Will be used to verify your account"
            value={this.state.phone}
            onChange={this.onTextFieldChange}
            usePhoneFormat
            required
            disabled={!isClient}
          />
        </div>
        <div className="col-6 mb-3">
          <TextField
            label="Donation Amount"
            id={this.genId("amount")}
            name="amount"
            type="text"
            className="form-control"
            placeholder="(300.00)"
            feedback="Amount you would like to donate"
            autoComplete={this.fakeAutoComplete}
            value={this.state.amount}
            onChange={this.onTextFieldChange}
            useCurrencyFormat
            required
            disabled={!isClient}
          />
        </div>
      </form>
    )
  }
}
