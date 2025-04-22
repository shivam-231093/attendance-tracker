import React from 'react'
import Rsubject from './Rsubject'

export default function RiskSubjectsList() {
    const rsubjects = [{ id: 1, name: 'Mathematics', attend: 50 },
      { id: 2, name: 'Electrical', attend: 20 },
      { id: 3, name: 'Engineering Drawing', attend: 30 },
      { id: 4, name: 'Language Lab', attend: 10 },
      { id: 5, name: 'English', attend: 40 },
      ]    
  return (
    <>
          {rsubjects.map((rsubject) => (
            <Rsubject key={rsubject.id} rsubject={rsubject} />
          ))}
        </>
  )
}
