import styles from "./loading-dots.module.css"

export function LoadingDots({ alt = "Loading..." }) {
  return (
    <div className={styles.loader}>
      <div></div>
      <span></span>
      <div></div>
      <span></span>
      <div></div>
    </div>
  )
}
