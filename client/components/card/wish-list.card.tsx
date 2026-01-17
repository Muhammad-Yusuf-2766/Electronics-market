'use client'

import { deleteFavorite } from '@/actions/user.action'
import useAction from '@/hooks/use-action'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface Props {
	product: Partial<IProduct>
}
const WishListCard: FC<Props> = ({ product }) => {
	const [ismounted, setIsMounted] = useState(false)
	const { isLoading, onError, setIsLoading } = useAction()

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteFavorite({ id: product._id! })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Product removed from watchlist')
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsMounted(true)
	}, [])
	return (
		<div className={'border relative flex flex-col'}>
			<div className='bg-secondary relative'>
				<Image
					src={product.image!}
					width={200}
					height={200}
					className='mx-auto'
					alt={product.title!}
				/>
				<div className='absolute right-0 top-0 z-50 flex items-center'>
					<Button
						type='button'
						size={'icon'}
						onClick={onDelete}
						disabled={isLoading}
					>
						<Heart className='text-red-500 fill-red-500' />
					</Button>
				</div>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					{ismounted && (
						<p className='font-medium'>{formatPrice(+product.price!)}</p>
					)}
				</div>
				<p className='text-xs text-muted-foreground line-clamp-5'>
					{product.description}
				</p>
			</div>
		</div>
	)
}

export default WishListCard
