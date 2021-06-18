import React, { useEffect, useState } from 'react'
import { getCurrentOrder, getOtherOrders, getUser, replaceOrder } from '../logic/redux/userSlice'
import { useAppSelector, useAppDispatch } from '../logic/redux/hooks';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

import { SummaryProps } from '../logic/utils/types'

export const Summary = (props: SummaryProps) => {
	// const error = useSelector(getError)
	const [options,updateOptions] = useState([] as Array<Option>)
	const currentOrder = useAppSelector(getCurrentOrder)
	const otherOrders = useAppSelector(getOtherOrders)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (!currentOrder.OrderID) {
			dispatch(getUser({
				CustomerID: props.customerID!,
				OrderID: props.orderID!
			}))
		}
	});

	useEffect(()=>{
		let opts: Array<Option> = otherOrders.map((o,i)=>{ return {value:i.toString(), label: o.OrderID} as Option})	
		updateOptions(opts)
	},[otherOrders])

	const updateOrder = (item:Option) =>{
		dispatch(replaceOrder(otherOrders[JSON.parse(item.value)]))
	}


	return (
		<div className="page" id="summary">
			<div id="SummaryInfo">
				<div id="summaryLeft">
					<div id="dropdown">
						Other Orders:
						<Dropdown options={options} onChange={updateOrder} value={currentOrder.OrderID} placeholder="" />
					</div>
					<div id="userGreeting">
						<span id="intro">Hello, {currentOrder.Email}</span>
						<br/>
						<br/>
						<span id="orderLine">The Order <span id="orderID">{currentOrder.OrderID}</span></span>
						<br/>
						<br/>
						<span id="statusTitle">Has the following status:</span>
						<br/>
						<br/>
						<div id="summaryStatus">{currentOrder.Status}</div>
					</div>
				</div>
				<div id="summaryRight">
					<div id="gradient"></div>
				</div>
			</div>
		</div>
	)
}