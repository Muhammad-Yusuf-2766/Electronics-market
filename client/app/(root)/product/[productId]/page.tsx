import { getProduct } from '@/actions/user.action'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import CreateOrderButton from '../_components/create-order.btn'

interface Props {
	params: Params
}

const Page: FC<Props> = async ({ params }) => {
	const { productId } = await params
	const res = await getProduct({ id: productId })

	const product = res.data?.product

	if (!product) notFound()
	return (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
			<div className='bg-secondary relative w-full h-[70vh] col-span-2'>
				<Image
					src={product.image}
					fill
					className='mx-auto'
					alt={product.title}
				/>
			</div>
			<div className='flex flex-col space-y-1 self-center'>
				<h1 className='font-bold text-4xl'>{product.title}</h1>
				<Badge className='w-fit' variant={'secondary'}>
					# {product.category}
				</Badge>
				<p className='text-xs text-muted-foreground'>{product.description}</p>
				<p className='font-bold'>{formatPrice(+product.price)}</p>
				<CreateOrderButton />
				<div className='text-xs'>
					Your purchase is secure with us. We do not store any credit card
					information. We use Payme for payment processing.
				</div>
			</div>
		</div>
	)
}

export default Page
