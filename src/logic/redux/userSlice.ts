import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../api/userApi';
import { RootState } from './store';

export interface UserState{
	currentOrder: UserData,
	otherOrders: Array<UserData>
	userID: string,
	email: string,
}

export const initialState: UserState = {
	currentOrder: {} as UserData,
	otherOrders: [],
	userID: "",
	email: ""	
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state,action:PayloadAction<UserData>) => {
			let otherOrders = action.payload.OtherOrders

			const newOrder = {...action.payload}
			newOrder.OtherOrders = []

			state.currentOrder = newOrder


			state.otherOrders = otherOrders || []
			state.userID = state.currentOrder.UserID
			state.email = state.currentOrder.Email
		},
		replaceOrder: (state,action: PayloadAction<UserData>) => {
			let currentOrder = state.currentOrder
			let otherOrders = state.otherOrders.filter( o => o.OrderID !== action.payload.OrderID)

			otherOrders.push(currentOrder)

			state.currentOrder = action.payload
			state.otherOrders = otherOrders
		}
	}
})

export const getCurrentOrder = (state: RootState) => state.user.currentOrder
export const getOtherOrders = (state: RootState) => state.user.otherOrders

export const { addUser, replaceOrder } = userSlice.actions

export default userSlice.reducer