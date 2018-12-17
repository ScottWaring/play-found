import React from 'react'
const PlaygroundCard =(props)=> {
let photo = props.pg.photos
  return (
    <div>
    {console.log(props)}
{console.log(photo)}
      <h3>{props.pg.name}</h3>
      <h5>{props.pg.vicinity}</h5>
    </div>
  )
}


export default PlaygroundCard
