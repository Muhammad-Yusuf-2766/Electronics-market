'use client'

import { deleteProduct } from '@/actions/admin.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	const [ismounted, setIsmounted] = useState<boolean>(false)
	const { setOpen, setProduct } = useProduct()
	const { isLoading, setIsLoading, onError } = useAction()

	const onEdit = () => {
		setOpen(true)
		setProduct(product)
	}

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteProduct({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong... :(')
		}

		if (res?.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 203) {
			toast.warning('Product deleted successfully.')
			setOpen(false)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsmounted(true)
	}, [])

	return (
		<div className={'border relative flex justify-between flex-col'}>
			<div className='bg-secondary relative'>
				<Image
					src={product.image!}
					width={200}
					height={200}
					className='mx-auto'
					alt={product.title!}
				/>
				<Badge className='absolute top-0 left-0'>{product.category}</Badge>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					{ismounted && (
						<p className='font-medium'>{formatPrice(product.price!)}</p>
					)}
				</div>
				<p className='text-xs text-muted-foreground leading-snug line-clamp-5'>
					{product.description}
				</p>
				<Separator className='my-2' />
			</div>

			<div className='grid grid-cols-2 gap-2 px-2 pb-2'>
				<Button type='button' variant={'secondary'} onClick={onEdit}>
					Edit
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button type='button' variant={'outline'}>
							Delete
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={onDelete} disabled={isLoading}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default ProductCard
