import React from 'react'

const Heading = ({ title } : { title: string }) => {
  return (
    <h2 className="text-black text-4xl font-extrabold text-center mt-6 max-lg:text-3xl">{ title }</h2>
  )
}

export default Heading