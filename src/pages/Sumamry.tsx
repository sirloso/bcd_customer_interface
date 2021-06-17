import React,{ useState } from 'react'

import { SummaryProps } from '../logic/utils/types'

export const Summary = (props:SummaryProps) => {
	let [userData,updateData] = useState({})
	return(
		<div className="page" id="summary">
			summary
		</div>
	)
}