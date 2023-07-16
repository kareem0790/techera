import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const retry = () => {
    onRetry()
  }

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
