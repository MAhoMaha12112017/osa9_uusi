import React from 'react';
// import ReactDOM from 'react-dom';
import { CoursePart } from '../index';
import Part from './Part';


const Content: React.FC<{courseParts: CoursePart[]}> = ( {courseParts}) => {
  return (
    <div>
      {courseParts.map(cp => 
        <Part 
          key={cp.name} 
          coursePart={cp} 
        />)}
      {/* {courseParts.map(cp => <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>)} */}
    </div>
  )
}


// const Content: React.FC<{courseParts: CoursePart[]}> = ( {courseParts}) => {
//   return (
//     <div>
//       {courseParts.map(cp => <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>)}
//     </div>
//   )
// }

export default Content;