'use server'

import { axiosClient } from '@/http/axios'
import authOptions from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import { idSchema, searchParamsSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'

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
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return JSON.parse(JSON.stringify(data))
	})
