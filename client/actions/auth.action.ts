'use server'

import { axiosClient } from '@/http/axios'
import { actionClient } from '@/lib/safe-action'
import {
	emailSchema,
	loginSchema,
	registerSchema,
	verifyOtpSchema,
} from '@/lib/validation'
import { ReturnActionType } from '@/types'

export const login = actionClient
	.inputSchema(loginSchema)
	.action(async ({ parsedInput }) => {
		const { email, password } = parsedInput
		const { data } = await axiosClient.post<ReturnActionType>('/auth/login', {
			email,
			password,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const register = actionClient
	.inputSchema(registerSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { fullName, email, password } = parsedInput
		const { data } = await axiosClient.post('/auth/register', {
			fullName,
			email,
			password,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const sendOtp = actionClient
	.inputSchema(emailSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.post('/otp/send', parsedInput)
		return JSON.parse(JSON.stringify(data))
	})

export const verifyOtp = actionClient
	.inputSchema(verifyOtpSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.post('/otp/verify', parsedInput)
		return JSON.parse(JSON.stringify(data))
	})
