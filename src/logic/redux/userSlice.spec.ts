import { UserData } from '../api/userApi'
import userReducer, {
	replaceOrder,
	addUser,
	UserState
} from './userSlice'


describe('user reducer', () => {
	const initialState: UserState = {
		currentOrder: {} as UserData,
		otherOrders: [],
		email: "",
		userID: "235123"
	}
	const OtherOrders = [
		{
			BCDURL: "asdf",
			Coupon: "sdfsdf",
			BlankRolls: "0",
			Email: "los@losstudios.xyz",
			Link: "github.com",
			OrderID: "2234231235",
			RequestedShipping: "false",
			ShippingLink: "link",
			Status: "Just Added",
			UserID: "235123",
			OtherOrders: []
		},
	]
	const specUser: UserData = {
		BCDURL: "asdf",
		Coupon: "sdfsdf",
		BlankRolls: "0",
		Email: "los@losstudios.xyz",
		Link: "github.com",
		OrderID: "231235",
		RequestedShipping: "false",
		ShippingLink: "link",
		Status: "Just Added",
		UserID: "235123",
		OtherOrders
	}
	it("should handle initial state", () => {
		expect(
			userReducer(undefined, { type: "uknown" })
		).toEqual({
			currentOrder: {},
			otherOrders: [],
			userID: "",
			email: ""
		})
	})
	it("should handle adding user", () => {
		const actual = userReducer(initialState, addUser(specUser))
		expect(actual.currentOrder.OrderID).toEqual(specUser.OrderID)
		expect(actual.otherOrders.length).toEqual(1)
		expect(actual.otherOrders[0].OrderID).toEqual(OtherOrders[0].OrderID)
	})
	it("should handle replacing order", () => {
		const state = userReducer(initialState, addUser(specUser))
		const testState = userReducer(state,replaceOrder(OtherOrders[0]))
		expect(testState.currentOrder.OrderID).toEqual(OtherOrders[0].OrderID)
		expect(testState.otherOrders.length).toEqual(1)
		expect(testState.otherOrders[0].OrderID).toEqual(specUser.OrderID)
	})
})