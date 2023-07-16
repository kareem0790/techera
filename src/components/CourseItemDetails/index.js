import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const statusList = {
  initial: 'INITIAL',
  loading: 'LOADINg',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: [],
    status: statusList.initial,
  }

  componentDidMount() {
    this.courseDetailsApiUrl()
  }

  courseDetailsApiUrl = async () => {
    this.setState({status: statusList.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({courseDetails: updatedData, status: statusList.success})
    } else {
      this.setState({status: statusList.failure})
    }
  }

  loaderSpinner = () => (
    <div className="loader-container" data-testid="loader">
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  getSucces = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="body-container">
        <img src={imageUrl} alt={name} className="item-image" />
        <div>
          <h1 className="item-heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  onRetry = () => {
    this.courseDetailsApiUrl()
  }

  getFailureView = () => (
    <>
      <FailureView onRetry={this.onRetry} />
    </>
  )

  getStatus = () => {
    const {status} = this.state

    switch (status) {
      case statusList.loading:
        return this.loaderSpinner()
      case statusList.success:
        return this.getSucces()
      case statusList.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="item-details-container">
        <Header />
        {this.getStatus()}
      </div>
    )
  }
}

export default CourseItemDetails
