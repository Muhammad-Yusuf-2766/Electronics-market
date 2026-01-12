import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'

const CreateOrderButton = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button type='button' className='w-fit' size={'lg'}>
					Purchase
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-1 w-56' side='right'>
				<div className='flex flex-col space-y-1'>
					<Button type='button' variant={'secondary'}>
						<Image
							src={'/stripe.svg'}
							alt='stripe'
							width={70}
							height={50}
							className='cursor-pointer'
						/>
					</Button>
					<Button type='button' variant={'secondary'}>
						<Image
							src={'/click.svg'}
							alt=''
							width={70}
							height={50}
							className='cursor-pointer'
						/>
					</Button>
					<Button type='button' variant={'secondary'}>
						<Image
							src={'/payme.svg'}
							alt='stripe'
							width={70}
							height={50}
							className='cursor-pointer'
						/>
					</Button>
					<Button type='button' variant={'secondary'}>
						<Image
							src={'/uzum.svg'}
							alt='stripe'
							width={70}
							height={50}
							className='cursor-pointer'
						/>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default CreateOrderButton
