import React from 'react'

const PlaygroundCard =(props)=> {
  return (
    <div className="pg-card"  onClick={()=>props.viewPg(props.pg.place_id)}>
      <h3>{props.pg.name}</h3>
      <h5>{props.pg.vicinity ? props.pg.vicinity : props.pg.formatted_address}</h5>
    </div>
  )
}
//

export default PlaygroundCard
