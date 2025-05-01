import React, { JSX } from 'react'

export default function Projects(): JSX.Element {
  return (
    <>
      <div className="h-[calc(95vh-100px)] flex flex-col ">
        <h1 className="text-4xl font-bold text-center text-white">Projects</h1>
        <div>
          <h1 className="text-4xl font-bold text-center text-white">
            Geared Up
          </h1>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center text-white">
            Todo List
          </h1>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center text-white">
            Studio Ghibli Fan Wiki
          </h1>
        </div>
      </div>
      <hr className="border-white w-1/2 mx-auto mb-4" />
    </>
  )
}
