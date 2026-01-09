import { ChildProps } from '@/types'
import { FC } from 'react'
import Sidebar from './_components/sidebar'

const Layout: FC<ChildProps> = ({ children }) => {
	return (
		<div className='grid grid-cols-4'>
			<div className='col-span-1'>
				<Sidebar />
			</div>
			<div className='col-span-3 p-5'>{children}</div>
		</div>
	)
}

export default Layout
