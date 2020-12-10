import { PureComponent } from "react"
import { LoadingSpinner } from "components/loading-spinner"
import styles from "./async-video-player.module.css"

let Player

export class AsyncVideoPlayer extends PureComponent {
  async componentDidMount() {
    if(!Player) {
      Player = (await import("react-player")).default
      console.debug(Player)
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {
          Player
            ? (
                <Player
                  { ...this.props }
                  className={styles.content}
                  width="100%"
                  height="100%"
                />
              )
            : (
                <div className={styles.content}>
                  <LoadingSpinner />
                </div>
              )
        }
      </div>
    )
  }
}
