import { PureComponent } from "react"
import { LoadingSpinner } from "components/loading-spinner"
import styles from "./async-video-player.module.css"

let Player

function Loader({ children }) {
  return (
    <div className={styles.content}>
      <LoadingSpinner />
      {
        !!children && (
          <div className="d-none">
            { children }
          </div>
        )
      }
    </div>
  )
}

export class AsyncVideoPlayer extends PureComponent {
  state = { ready: false }

  onReady = (...args) => {
    this.setState({ ready: true })
    this.props.onReady && this.props.onReady(...args)
  }

  setReady = () => this.setState({ ready: true })

  async componentDidMount() {
    if(!Player) {
      Player = (await import("react-player/lazy")).default
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {
          Player
            ? (
                this.state.ready
                  ? (
                      <Player
                        { ...this.props }
                        onReady={this.onReady}
                        className={styles.content}
                        width="100%"
                        height="100%"
                      />
                    )
                  : (
                      <Loader>
                        <Player
                          { ...this.props }
                          onReady={this.onReady}
                          className={styles.content}
                          width="100%"
                          height="100%"
                        />
                      </Loader>
                    )
              )
            : (
                <Loader />
              )
        }
      </div>
    )
  }
}
