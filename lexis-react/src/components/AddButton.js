import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { ReactComponent as AddIcon } from '../assets/add.svg'

const AddButton = () => {
  return (

    <Link to="/note/new/" className="floating-button">
        <AddIcon />
    </Link>
  )
}

export default AddButton