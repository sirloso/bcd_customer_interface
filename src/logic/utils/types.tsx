import { RouteComponentProps } from '@reach/router'

export interface HomeProps extends RouteComponentProps{ }

export interface SummaryProps extends RouteComponentProps{
	customerID?: string
	orderID?: string
}

export interface UserRequest{
	CustomerID: string
	OrderID: string
}