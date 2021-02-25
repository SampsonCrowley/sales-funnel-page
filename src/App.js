import { useRef, useContext, useState, useEffect } from "react"
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
        [ eventScheduled, setEventScheduled ] = useState(/\/event_scheduled/.test(window.location)),
        [ showCalendar, setShowCalender ] = useState(!!eventScheduled),
        [ boundingRect, setBoundingRect ] = useState(null),
        isProduction = process.env.NODE_ENV === "production",
        urlParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    if(showCalendar && formWrapper.current) {
      setBoundingRect(formWrapper.current.getBoundingClientRect())
    } else {
      setBoundingRect(null)
    }
  }, [ showCalendar, formWrapper.current ])

  useEffect(() => {
    if(calendlyEvent.event === "calendly.event_scheduled") {
      try {
        const url = new URL(calendlyEvent.payload.event.uri),
              key = /^\/scheduled_events\/[^/]+/.test(url.pathname) ? url.pathname.split("/")[2] : "",
              path = `/event_scheduled/${key || ""}`

        if(window.history) {
          window.history.pushState(key || "scheduled", "Event Scheduled!", path)
          setEventScheduled(key || true)
        } else {
          window.location.href = path
        }
      } catch(err) {
        window.location.href = "/event_scheduled"
      }
    }
    /*
    {"event":"calendly.event_scheduled","payload":{"event":{"uri":"https://api.calendly.com/scheduled_events/CDW7YFUUGSM5BOPY"},"invitee":{"uri":"https://api.calendly.com/scheduled_events/CDW7YFUUGSM5BOPY/invitees/GF5NIVWIEUG64SBZ"}}}
    */
  }, [ calendlyEvent ])

  function calendlyEventHandler(ev) {
    setCalendlyEvent(ev.data)
  }

  function openCalendarModal(ev) {
    ev && ev.preventDefault()

    setShowCalender(true)
  }

  function closeCalendar(ev) {
    ev && ev.preventDefault()

    setShowCalender(false)
    setEventScheduled(false)
  }

  return (
    <section
      className={`${styles.app} ${showCalendar ? "modal-open" : ""}`}
      onClick={showCalendar ? closeCalendar : undefined}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-5 d-flex flex-column">
            <header className={`${styles.topHeader} mb-5`}>
              <img src={logo} alt="MoneyDolly" className={styles.topHeaderLogo} />
            </header>
            <div className={`ps-lg-5 flex-fill d-flex flex-column justify-content-center`}>
              {
                /*
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
                */
              }
              <div className="row">
                <div className="col d-flex justify-content-center justify-content-lg-start mb-5">
                  <button
                    className={`${styles.scheduleBtn} flex-lg-fill`}
                    onClick={openCalendarModal}
                  >
                    Schedule a Call
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div className="col d-flex align-items-end justify-content-end">
            <img
              className={`${styles.clickable} img-fluid`}
              src={iphone} alt="Get Help from Money Dolley"
              onClick={openCalendarModal}
            />
          </div>
        </div>
      </div>
      <div className={`modal ${showCalendar ? "d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog modal-fullscreen py-5 px-3 p-md-5">
          <div className="modal-content">
            {
              !!showCalendar
              && (
                eventScheduled
                  ? (
                      <h1 className=" d-flex flex-column justify-content-center h-100 text-center">
                        Your Event Has Been Scheduled!
                      </h1>
                    )
                  : (
                      <div ref={formWrapper} className="card h-100">
                        {
                          !!formWrapper.current
                          && !!showCalendar
                          && !!boundingRect
                          && !!boundingRect.height
                          && (
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
                                height={boundingRect.height}
                                scrolling="no"
                                src={`https://calendly.com/moneydolly?embed_domain=${document.location.host}&embed_type=PopupWidget`}
                              />
                            </CalendlyEventListener>
                          )
                        }
                      </div>
                    )
              )
            }
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
      {
        showCalendar && (
          <div className="modal-backdrop fade show"></div>
        )
      }
    </section>
  );
}
