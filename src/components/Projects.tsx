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
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <p>
            This website was our final group project during my time at Dev
            Academy. For this challenge we put all of our combined knowledge and
            skills to the test to produce a high quality product that
            accomplished the MVP we had set out to achieve and more. This
            website was designed to be a companion tool for the Great Walks of
            NZ, preparing the user for any walk they choose to attempt by
            providing them with a list of equipment required by that walk. The
            user is able to keep track of which walks they are planning or
            completed as well as the equipment they own.{' '}
          </p>
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
