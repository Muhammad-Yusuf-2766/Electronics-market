import { Button } from '../ui/button'

const Pagination = () => {
	return (
		<div className='flex w-full items-center justify-center gap-2 mt-4'>
			<Button type='button' size={'sm'}>
				Prev
			</Button>
			<p>1</p>
			<Button type='button' size={'sm'}>
				Next
			</Button>
		</div>
	)
}

export default Pagination
