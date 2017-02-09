import React, { PropTypes } from 'react'
const { array } = PropTypes

const TestList = ({listItems}) => {
    return (
        <div>
            ListItems: 
            <ul>
                { Object.keys(listItems).map((key, i) => {return <li key={i}>{listItems[key]}</li>})}
            </ul>
        </div>
    )
}

TestList.propTypes = {
  listItems: array.isRequired
}

export default TestList
