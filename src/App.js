import { useRef, useContext, useState, useEffect } from "react"
import styles from './App.module.css';
import { LoadingDots } from "components/loading-dots"
import { ExecutionContext } from "contexts/execution"
import logo from "images/logos/logo-cropped.jpg"
import iphone from "images/money-dolley-iphone.png"

// const today = new Date(),
//       month = `0${today.getMonth()}`.slice(-2),
//       calendlyLink = `https://calendly.com/moneydolly_/demo?month=${today.getFullYear()}-${month}`

const calendlyLink = "https://calendly.com/moneydolly_/demo"

export function App() {
  const { isClient } = useContext(ExecutionContext)

  return (
    <section className={styles.app}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-5 d-flex flex-column">
            <header className={styles.topHeader}>
              <img src={logo} alt="MoneyDolly" className={styles.topHeaderLogo} />
            </header>
            <div className="ps-lg-5 flex-fill d-flex flex-column">
              <h5 className={styles.ctaHeader}>
                Schedule a Free Call!
              </h5>
              <div className={styles.ctaArrow}>
                &#x2193;
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center justify-content-lg-start mb-5">
                  <a
                    href={calendlyLink}
                    className={`${styles.scheduleBtn} flex-lg-fill`}
                  >
                    SCHEDULE A CALL
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div className="col d-flex align-items-end justify-content-end">
            <a href={calendlyLink}>
              <img
                className="img-fluid"
                src={iphone}
                alt="Get Help from Money Dolley"
              />
            </a>
          </div>
        </div>
      </div>
      {
        !isClient && (
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingInner}>
              <LoadingDots />
            </div>
          </div>
        )
      }
    </section>
  );
}
