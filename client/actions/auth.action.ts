'use server'

import { axiosClient } from '@/http/axios'
import { actionClient } from '@/lib/safe-action'
import { loginSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'

export const login = actionClient
	.inputSchema(loginSchema)
	.action(async ({ parsedInput }) => {
		const { email, password } = parsedInput
		const { data } = await axiosClient.post<ReturnActionType>('/auth/login', { email, password })
		return JSON.parse(JSON.stringify(data))
	})
