import { useRef, useContext, useState } from "react"
import styles from './App.module.css';
import { AsyncVideoPlayer } from "components/async-video-player"
import { LoadingDots } from "components/loading-dots"
// import { SignupForm } from "components/signup-form"
import { ExecutionContext } from "contexts/execution"
import { CalendlyEventListener } from "react-calendly"
import logo from "images/logos/logo-cropped.jpg"

export function App() {
  const formWrapper = useRef(null),
        { isClient } = useContext(ExecutionContext),
        [ calendlyEvent, setCalendlyEvent ] = useState({}),
        urlParams = new URLSearchParams(window.location.search),
        header = urlParams.get('header'),
        subHeader = urlParams.get('sub-header'),
        button = urlParams.get('button'),
        underText = urlParams.get('under');

  function scrollToForm(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if(formWrapper.current) formWrapper.current.scrollIntoView({ block: "start", inline: "start", behavior: "smooth" })
  }

  function calendlyEventHandler(ev) {
    setCalendlyEvent(ev.data)
  }

  return (
    <section className={styles.app}>
      <header className={`${styles.topHeader} mb-5`}>
        <img src={logo} alt="MoneyDolly" className={styles.topHeaderLogo} />
      </header>
      <div className="container pb-5">
        <div className={`${styles.header} mb-5`}>
          <div className="d-flex flex-column align-items-center mb-3">
            <h2>
              {
                header
                || "Attention-Grabbing Sales Funnel Headline"
              }
            </h2>
            <p>
              {
                subHeader
                || "More detailed explanation of what is happending and why they should continue. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            {
              !!button && (
                <button onClick={scrollToForm} className="btn d-block btn-lg btn-info" disabled={!isClient}>
                  { button }
                </button>
              )
            }

            {
              !!underText && (
                <p className="text-center pt-2">
                  <i>
                    Starting from $4/month
                  </i>
                </p>
              )
            }
          </div>
        </div>

        <div className={`${styles.contentBlock} mb-5`}>
          <AsyncVideoPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        </div>

        <div className={`${styles.contentBlock} mb-5`}>
          <div className="container-fluid">
            <CalendlyEventListener
              onDateAndTimeSelected={calendlyEventHandler}
              onEventScheduled={calendlyEventHandler}
              onEventTypeViewed={calendlyEventHandler}
              onProfilePageViewed={calendlyEventHandler}
            >
              <div ref={formWrapper} className="row-full">
                <iframe
                  title="MoneyDolly Calender Reservations"
                  frameBorder="0"
                  width="100%"
                  height={calendlyEvent.event === "calendly.event_type_viewed" ? "1500px" : "1000px"}
                  scrolling="no"
                  src={`https://calendly.com/moneydolly?embed_domain=${document.location.host}&embed_type=Inline`}
                />
              </div>
            </CalendlyEventListener>
          </div>
        </div>

        <div className={`${styles.contentBlock} py-5 mb-5`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                Calendly Events: { JSON.stringify(calendlyEvent) }
              </div>
            </div>
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
