'use server'

import { axiosClient } from '@/http/axios'
import authOptions from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import {
	idSchema,
	passwordSchema,
	searchParamsSchema,
	updateUserSchema,
} from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const getProducts = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.get('/user/products', {
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const getProduct = actionClient
	.inputSchema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.get(`/user/product/${parsedInput.id}`)
		return JSON.parse(JSON.stringify(data))
	})

export const getStatistics = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser)
		return { failure: 'You must be logged to get your statistics' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/user/statistics`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data))
})

export const getOrders = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/user/orders', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})

		return JSON.parse(JSON.stringify(data))
	})

export const getTransactions = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/user/transactions', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})

		return JSON.parse(JSON.stringify(data))
	})

export const getFavourites = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/user/favourites', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})

		return JSON.parse(JSON.stringify(data))
	})

export const addFavorite = actionClient
	.inputSchema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/user/add-favorite',
			{ productId: parsedInput.id },
			{ headers: { Authorization: `Bearer ${token}` } },
		)
		return JSON.parse(JSON.stringify(data))
	})

export const stripeCheckout = actionClient
	.inputSchema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/user/stripe/checkout',
			{ productId: parsedInput.id },
			{ headers: { Authorization: `Bearer ${token}` } },
		)
		return JSON.parse(JSON.stringify(data))
	})

export const updateUser = actionClient
	.inputSchema(updateUserSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			'/user/update-profile',
			parsedInput,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		)
		revalidatePath('/dashboard')
		return JSON.parse(JSON.stringify(data))
	})

export const updatePassword = actionClient
	.inputSchema(passwordSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			'/user/update-password',
			parsedInput,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		)
		return JSON.parse(JSON.stringify(data))
	})

export const deleteFavorite = actionClient
	.inputSchema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.delete(
			`/user/delete-favorite/${parsedInput.id}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		)
		revalidatePath('/dashboard/watch-list')
		return JSON.parse(JSON.stringify(data))
	})
