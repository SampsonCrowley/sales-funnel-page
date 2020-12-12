import React, { Component, createContext } from "react"

export const ExecutionContext = createContext({ isClient: false })

ExecutionContext.displayName = "ExecutionContext"

export class ExecutionContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { isClient: false }
  }

  componentDidMount() {
    this.setState({ isClient: String(navigator.userAgent) !== "ReactSnap" })
  }

  render() {
    return (
      <ExecutionContext.Provider value={this.state}>
        {this.props.children}
      </ExecutionContext.Provider>
    )
  }
}
