import React from 'react'
import { Link } from "react-router-dom"
function About() {
    return (
        <div className='container flex-col items-center'>
            <h1 className="text-6xl text-center mb-4">Github Finder Application</h1>
            <div className="card card-bordered w-6/12 mx-auto">
                <div className="card-body">
                    <h2 className="card-title">Learning Project</h2>
                    <p>This is a Tailwind CSS and Daisy UI learning project build with React</p>
                    <div className="card-actions">
                        <Link className='btn btn-sm rounded-btn' to='/'>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
