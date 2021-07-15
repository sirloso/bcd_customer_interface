import React, { useEffect, useState, useRef } from 'react'
import { getCurrentOrder, getOtherOrders, getUser, replaceOrder } from '../logic/redux/userSlice'
import { useAppSelector, useAppDispatch } from '../logic/redux/hooks';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

import { SummaryProps } from '../logic/utils/types'

export const Summary = (props: SummaryProps) => {
	// const error = useSelector(getError)
	const embedder = useRef({} as any)
	const [options, updateOptions] = useState([] as Array<Option>)
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

	useEffect(() => {
		let opts: Array<Option> = otherOrders.map((o, i) => { return { value: i.toString(), label: o.OrderID } as Option })
		updateOptions(opts)
	}, [otherOrders])

	const updateOrder = (item: Option) => {
		dispatch(replaceOrder(otherOrders[JSON.parse(item.value)]))
	}

	useEffect(() => {
		// if (embedder.current) {
			var options = {
				// Shared link to Dropbox file
				link: "https://www.dropbox.com/sh/ggl4rbv1pni09b2/AADF0BBTHFH8B2bEUNCMeJ-Xa?dl=0",
				file: {
					// Sets the zoom mode for embedded files. Defaults to 'best'.
					zoom: "fit" // or "fit"
				},
				folder: {
					// Sets the view mode for embedded folders. Defaults to 'list'.
					view: "list", // or "grid"
					headerSize: "small" // or "small"
				}
			}
			console.log(embedder)
			//@ts-ignore
			console.log(window.Dropbox)
			//@ts-ignore
			if(window.Dropbox){
				//@ts-ignore
				window.Dropbox.embed(options, embedder.current);
				console.log("added embed",embedder.current)
			}
		// }
	}, [embedder]);


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
						<br />
						<br />
						<span id="orderLine">The Order <span id="orderID">{currentOrder.OrderID}</span></span>
						<br />
						<br />
						<span id="statusTitle">Has the following status:</span>
						<br />
						<br />
						<div id="summaryStatus">{currentOrder.Status}</div>
						<br />
						<div id="line" />
						<br />
						{
							currentOrder.Link !== "" && (
								<div id="dropboxLink">
									Your uploaded photos can be accessed
									<span className="hover" id="link"> <a href={currentOrder.Link}>here</a> </span>
								</div>
							)
						}
						<br />
						<br />
						{
							currentOrder.BlankRolls !== "0" && (
								<div id="blankrolls">
									We weren't able to process <span id="blankRollsNum">{currentOrder.BlankRolls}</span> of your rolls
									<br />
									<br />
									you can use the following coupon as credit towards your next order:
									<br />
									<br />
									<span id="coupon">{currentOrder.Coupon}</span>
								</div>
							)
						}
						<br />
						<br />
						{
							currentOrder.RequestedShipping === "true" && (
								<div id="blankrolls">
									Your order has been shipped!
									<br />
									<br />
									you can track it <span id="link"><a href={currentOrder.ShippingLink}>here</a></span>
								</div>
							)
						}
					</div>
				</div>
				<div id="summaryRight">
					<div ref={embedder} id="gradients"></div>
				</div>
			</div>
		</div>
	)
}