import styles from "./loading-spinner.module.css"
import reactLogo from "images/react-logo.svg"

export function LoadingSpinner({ alt = "Loading..." }) {
  return (
    <div className={styles.wrapper}>
      <img src={reactLogo} className={styles.spinner} alt={alt}/>
    </div>
  )
}
