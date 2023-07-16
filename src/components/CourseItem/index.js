import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <Link className="link" to={`/courses/${id}`}>
      <li className="list-item">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="paragraph">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
