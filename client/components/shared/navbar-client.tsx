import { User } from 'lucide-react'
import type { Session } from 'next-auth'
import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './logo'
import UserBox from './user-box'

const NavbarClient = async ({ session }: { session: Session | null }) => {
	return (
		<div className='h-15 bg-secondary border-b fixed inset-0 z-50'>
			<div className='container max-w-7xl mx-auto flex items-center justify-between h-full px-5'>
				<Logo />

				<div className='flex items-center gap-2'>
					{session?.currentUser?._id && <UserBox user={session.currentUser} />}
					{!session?.currentUser?._id && (
						<Button type='button' asChild size={'icon'}>
							<Link href={'/sign-in'}>
								<User />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default NavbarClient
