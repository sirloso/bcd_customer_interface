import * as api from '../api/userApi'
import * as sagas from '../sagas/rootSaga'
import * as actions from '../redux/userSlice'
import { runSaga } from 'redux-saga'
import { Action } from '@reduxjs/toolkit'

describe("root saga working", () => {
	it("calls api correctly", async () => {
		const dummyUser = {} as api.UserData
		const dispatched:Array<Action> = []
		const dummyAction = actions.getUser({
			CustomerID: "1",
			OrderID: "1",
		})
		const expectedAction = actions.addUser(dummyUser)

		const dummyApi = jest.spyOn(api, "getUser")
			.mockImplementation(() => {
				return Promise.resolve(dummyUser)
			})

		const result = await runSaga({
			dispatch: (action: any) => dispatched.push(action),
			getState: () => {
				return {} as actions.UserState
			}
		},
			sagas.fetchUser,
			dummyAction
		).toPromise()

		expect(dummyApi).toHaveBeenCalledTimes(1);
		expect(dispatched).toEqual( [ expectedAction ] )
		dummyApi.mockClear()
	})
})