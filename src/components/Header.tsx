import React from 'react'
import { navigate } from '@reach/router'
import "./Header.css"

export const Header = () => {
	return(
		<div id="header">
			<div id="left" onClick={()=>navigate("/")}>
				Bushwick Community Darkroom
			</div>
			<div id="right">
				Customer Portal
			</div>
		</div>
	)
}