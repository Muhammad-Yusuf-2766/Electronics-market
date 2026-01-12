'use server'

import jwt from 'jsonwebtoken'

export const generateToken = async (userId: string) => {
	// === jwt_secret key must be replaced to .env on production
	const token = jwt.sign({ userId }, process.env.NEXT_PUBLIC_JWT_SECRET!, {
		expiresIn: '1m',
	})
	return token
}
