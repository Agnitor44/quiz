import React from 'react'
import { useHistory } from "react-router-dom"

const Start = () => {
    const history = useHistory()
    return (
<div>
<button onClick = { () => history.push('/game')}>Start</button>

</div>
    )
}
export default Start