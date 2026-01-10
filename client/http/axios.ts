import axios from 'axios'

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER

export const axiosClient = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})
