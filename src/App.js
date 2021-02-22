import { useRef, useContext, useState } from "react"
import styles from './App.module.css';
import { AsyncVideoPlayer } from "components/async-video-player"
import { LoadingDots } from "components/loading-dots"
// import { SignupForm } from "components/signup-form"
import { ExecutionContext } from "contexts/execution"
import { CalendlyEventListener } from "react-calendly"
import logo from "images/logos/logo-cropped.jpg"
import iphone from "images/money-dolley-iphone.png"

export function App() {
  const formWrapper = useRef(null),
        { isClient } = useContext(ExecutionContext),
        [ calendlyEvent, setCalendlyEvent ] = useState({}),
        [ schedulingEvent, setSchedulingEvent ] = useState(false),
        [ showCalendar, setShowCalender ] = useState(false),
        isProduction = process.env.NODE_ENV === "production",
        urlParams = new URLSearchParams(window.location.search),
        header = urlParams.get('header'),
        subHeader = urlParams.get('sub-header'),
        button = urlParams.get('button'),
        underText = urlParams.get('under');

  function scrollToForm(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if(formWrapper.current) formWrapper.current.scrollIntoView({ block: "start", inline: "start", behavior: "smooth" })
    setSchedulingEvent(true)
  }

  function calendlyEventHandler(ev) {
    setCalendlyEvent(ev.data)
  }

  function scheduleCompleted(ev) {
    ev && ev.preventDefault()

    setSchedulingEvent(false)
  }

  function scheduleEvent(ev) {
    ev && ev.preventDefault()

    setSchedulingEvent(true)
  }

  function openCalendarModal(ev) {
    ev && ev.preventDefault()

    setShowCalender(true)
  }

  function closeCalendar(ev) {
    ev && ev.preventDefault()

    setShowCalender(false)
  }

  return (
    <section
      className={`${styles.app} ${showCalendar ? "modal-open" : ""}`}
      onClick={showCalendar ? closeCalendar : undefined}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-lg">
            <header className={`${styles.topHeader} mb-5`}>
              <img src={logo} alt="MoneyDolly" className={styles.topHeaderLogo} />
            </header>
            <div className={styles.largeLeftPad}>
              <h5 className={styles.easyHeader}>
                FUNDRAISING
                <br/>
                MADE
                <br/>
                EASY
              </h5>
              <p className={styles.description}>
                Covid concerns? No problem! Click below to schedule a no risk,
                no pressure 10-minute call with Money Dolly, and see how easy
                fundraising has just become.
              </p>
              <div className="row">
                <div className="col d-flex justify-content-start mb-5">
                  <button
                    className={styles.scheduleBtn}
                    onClick={openCalendarModal}
                  >
                    Schedule a Call
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div className="col d-flex align-items-end justify-content-end">
            <img className="img-fluid" src={iphone} alt="Get Help from Money Dolley"/>
          </div>
        </div>
      </div>
      <div class={`modal ${showCalendar ? "d-block" : "d-none"}`} tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div ref={formWrapper} className="card mb-5">
              <CalendlyEventListener
                onDateAndTimeSelected={calendlyEventHandler}
                onEventScheduled={calendlyEventHandler}
                onEventTypeViewed={calendlyEventHandler}
                onProfilePageViewed={calendlyEventHandler}
              >
                <iframe
                  title="MoneyDolly Calender Reservations"
                  frameBorder="0"
                  width="100%"
                  height={"300"}
                  scrolling="no"
                  src={`https://calendly.com/moneydolly?embed_domain=${document.location.host}&embed_type=PopupWidget`}
                />
              </CalendlyEventListener>
            </div>
          </div>
        </div>
      </div>
      {
        (!isProduction && false) && (
          <div className="row mb-5">
            <div className="col">
              <div className="card bg-dark text-light mb-5">
                <div className="card-body">
                  Calendly Events: { JSON.stringify(calendlyEvent) }
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        !isClient && (
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingInner}>
              <LoadingDots />
            </div>
          </div>
        )
      }
      {
        showCalendar && (
          <div className="modal-backdrop fade show"></div>
        )
      }
    </section>
  );
}
