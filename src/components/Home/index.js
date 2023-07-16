import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'
import FailureView from '../FailureView'
import Header from '../Header'
import './index.css'

const statusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    coursesList: [],
    status: statusList.initial,
  }

  componentDidMount() {
    this.coursesApiUrl()
  }

  coursesApiUrl = async () => {
    this.setState({status: statusList.loading})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({coursesList: updatedData, status: statusList.success})
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

  successView = () => {
    const {coursesList} = this.state

    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="list-container">
          {coursesList.map(each => (
            <CourseItem key={each.id} courseDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  onRetry = () => {
    this.coursesApiUrl()
  }

  failureView = () => (
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
        return this.successView()
      case statusList.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="bottom-container">{this.getStatus()}</div>
      </div>
    )
  }
}

export default Home
