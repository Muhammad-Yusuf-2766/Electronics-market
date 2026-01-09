import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'

const OrderActions = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={'icon'} className='size-6' variant={'outline'}>
					<ChevronDown />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-40 p-1' side='bottom'>
				<div className='flex flex-col space-y-0'>
					<Button variant={'outline'} size={'sm'} className='justify-start'>
						Confirm
					</Button>
					<Button variant={'outline'} size={'sm'} className='justify-start'>
						Delivery
					</Button>
					<Button variant={'outline'} size={'sm'} className='justify-start'>
						In progress
					</Button>
					<Button variant={'outline'} size={'sm'} className='justify-start'>
						Completed
					</Button>
					<Button variant={'outline'} size={'sm'} className='justify-start'>
						Delivered
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default OrderActions
