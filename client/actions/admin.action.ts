'use server'

import { axiosClient } from '@/http/axios'
import authOptions from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import {
	idSchema,
	productSchema,
	searchParamsSchema,
	updateProductSchema,
} from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'
//  ====== Uploadthing platform actions ======//
const utapi = new UTApi()
export async function deleteFile(key: string) {
	await utapi.deleteFiles(key)
}

export const createProduct = actionClient
	.inputSchema(productSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/admin/create-product',
			{
				...parsedInput,
				price: parseFloat(parsedInput.price),
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})

export const getProducts = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/admin/products', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})

		return JSON.parse(JSON.stringify(data))
	})

export const getCustomers = actionClient
	.inputSchema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/admin/customers', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
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
		const { data } = await axiosClient.get('/admin/orders', {
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
		const { data } = await axiosClient.get('/admin/transactions', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const updateProduct = actionClient
	.inputSchema(updateProductSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			`/admin/update-product/${parsedInput.id}`,
			{ ...parsedInput, price: parseFloat(parsedInput.price) },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})

export const deleteProduct = actionClient
	.inputSchema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser) {
			throw new Error('Current user is not found, please login.')
		}
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.delete(
			`/admin/delete-product/${parsedInput.id}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})
