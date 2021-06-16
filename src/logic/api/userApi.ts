import superagent from "superagent"

const ENDPOINT_URL = "localhost:1234/cusomter"
const PASSWORD = ""

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
	BCDURL: string,
	OtherOrders?: Array<UserData>
}

/*--getters----------*/
export const getUser = async (user:string, order:string ): Promise<UserData> => {
	let resp = await superagent(createURL(user,order))

	if(resp.statusCode!==200){
		console.log(resp.error)
		return Promise.reject("unable to get user")
	}

	let _userData = resp.body
	let userData: UserData = JSON.parse(_userData)

	return Promise.resolve(userData)
}

const createURL = (user:string, order:string) => {
	return `${ENDPOINT_URL}/${user}/${order}`
}
