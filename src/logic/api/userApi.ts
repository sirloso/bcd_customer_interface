import superagent from "superagent"

const ENDPOINT_URL = "http://localhost:9876/customer"
// const PASSWORD = ""

/*--types----------*/
export interface UserData{
	OrderID: string,
	UserID: string,
	Status: string,
	Email: string,
	Link: string,
	Coupon: string,
	BlankRolls: string,
	ShippingLink: string,
	RequestedShipping: string, 
	BcdUrl: string,
	OtherOrders?: Array<UserData>
}

/*--getters----------*/
export const getUser = async (user:string, order:string ): Promise<UserData> => {
	let url = createURL(user,order)
	console.log(url)
	let resp = await superagent(url)

	if(resp.statusCode!==200){
		console.log(resp.error)
		return Promise.reject("unable to get user")
	}

	let _userData = resp.body
	let userData: UserData = _userData

	return Promise.resolve(userData)
}

const createURL = (user:string, order:string) => {
	return `${ENDPOINT_URL}/${user}/${order}`
}
