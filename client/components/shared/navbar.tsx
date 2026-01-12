import authOptions from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import NavbarClient from './navbar-client'

export default async function Navbar() {
	const session = await getServerSession(authOptions)
	return <NavbarClient session={session} />
}
