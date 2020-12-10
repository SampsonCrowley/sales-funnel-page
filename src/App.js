import { useRef } from "react"
import styles from './App.module.css';
import { AsyncVideoPlayer } from "components/async-video-player"
import { SignupForm } from "components/signup-form"

export function App() {
  const formWrapper = useRef(null)
  function scrollToForm(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if(formWrapper.current) formWrapper.current.scrollIntoView({ block: "start", inline: "start", behavior: "smooth" })
  }
  return (
    <section className={styles.app}>
      <header className={`${styles.contentBlock} ${styles.header} bg-secondary py-5 text-white`}>
        <div className={`${styles.container} container`}>
          <div className="row">
            <div className="col-md-6">
              <div className="h-100 py-md-3 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column align-items-center mb-3">
                  <h2>
                    Attention-Grabbing Sales Funnel Headline
                  </h2>
                  <p>
                    More detailed explanation of what is happending and why they
                    should continue. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <button onClick={scrollToForm} className="btn d-block btn-lg btn-info">
                      Button Text for Scrolling to Form
                    </button>
                  </div>

                  <p className="text-center pt-2">
                    <i>
                      Starting from $4/month
                    </i>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4 d-md-none"></div>
            <div className="col-md-6">
              <div className="h-100 py-3 d-flex flex-column justify-content-center bg-dark">
                <AsyncVideoPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`${styles.contentBlock} py-5`}>
        <div className={`${styles.container} container`}>
          <div className="row justify-content-center">
            <div className="col-12">
              <h3 className={styles.featureHeader}>
                Item Being Sold Features Include:
              </h3>
            </div>
            <dl className={`${styles.featureList} col-sm-6`}>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
            </dl>
            <dl className={`${styles.featureList} col-sm-6`}>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
              <dt>
                Feature Title
              </dt>
              <dd>
                Feature Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${styles.contentBlock} bg-secondary py-5 text-white`}>
        <div className={`${styles.container} container`}>
          <div className="row">
            <div className="col">
              <h3 className="text-center mb-5">
                Get Started!
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col" ref={formWrapper}>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
