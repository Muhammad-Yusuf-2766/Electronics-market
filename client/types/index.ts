export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = Promise<{
	[key: string]: string | string[] | undefined
}>
export type Params = Promise<{ productId: string }>

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}

export interface IProduct {
	title: string
	category: string
	price: number
	description: string
	image: string
	imageKey: string
	_id: string
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	isNext: boolean
	products: IProduct[]
	product: IProduct
	customers: IUser[]
	orders: IOrder[]
	transactions: ITransactions[]
	statistics: {
		totalOrders: number
		totalTransactions: number
		totalFavourites: number
	}
}

export interface IUser {
	email: string
	fullName: string
	password: string
	_id: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
}

export interface IOrder {
	_id: string
	user: IUser
	product: IProduct
	price: number
	status: boolean
	createdAt: Date
	updatedAt: Date
}

export interface ITransactions {
	id: string
	user: IUser
	product: IProduct
	state: number
	amount: number
	create_time: number
	perform_time: number
	cancel_time: number
	reason: number
	provider: string
	prepare_id: string
}
