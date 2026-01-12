'use client'

import {
	createProduct,
	deleteFile,
	updateProduct,
} from '@/actions/admin.action'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { categories } from '@/lib/constants'
import { UploadDropzone } from '@/lib/uploadthing'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const AddProduct = () => {
	const { isLoading, setIsLoading, onError } = useAction()
	const { open, setOpen, product, setProduct } = useProduct() // custom hook for controlling create-product sheet

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			description: '',
			category: '',
			price: '',
			image: '',
			imageKey: '',
		},
	})
	const watchPrice = form.watch('price')
	const watchImage = form.watch('image')

	function onOpen() {
		setOpen(true)
		setProduct({
			_id: '',
			title: '',
			description: '',
			category: '',
			price: 0,
			image: '',
			imageKey: '',
		})
	}

	async function onSubmit(values: z.infer<typeof productSchema>) {
		if (!watchImage) return toast.error('Please upload an image')
		setIsLoading(true)
		let res
		if (product?._id) {
			res = await updateProduct({ ...values, id: product._id })
		} else {
			res = await createProduct(values)
		}

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong... :(')
		}

		if (res?.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 201) {
			toast.success('Product created successfully.')
			form.reset()
			setOpen(false)
			setIsLoading(false)
		}
		if (res.data.status === 200) {
			toast.success('Product updated successfully.')
			form.reset()
			setOpen(false)
			setIsLoading(false)
		}
	}

	function onDeleteImage() {
		deleteFile(form.getValues('imageKey'))
		form.setValue('image', '')
		form.setValue('imageKey', '')
	}

	useEffect(() => {
		if (product) {
			form.reset({ ...product, price: product.price.toString() })
		}
	}, [product])

	return (
		<>
			<Button type='button' size={'sm'} onClick={onOpen}>
				<span>Add Product</span>
				<PlusCircle />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className='overflow-y-auto pb-5'>
					<SheetHeader>
						<SheetTitle>Manage your product</SheetTitle>
						<SheetDescription>
							Field marked with * are required fields and must be filled.
						</SheetDescription>
					</SheetHeader>
					<Separator className='my-1' />
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-2 px-5'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Title</Label>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder='Adidas shoes'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Description</Label>
										<FormControl>
											<Textarea
												disabled={isLoading}
												placeholder='Adidas shoes are the best shoes in the world'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Cateogry</Label>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className='bg-secondary'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map(category => (
													<SelectItem value={category} key={category}>
														{category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>
											{!watchPrice
												? 'Price'
												: `Price ${formatPrice(Number(watchPrice))} `}
										</Label>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder='100.000 UZS'
												type='number'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							{watchImage && (
								<div className='w-full h-50 bg-secondary flex justify-center items-center relative'>
									<Image
										src={watchImage}
										fill
										objectFit='cover'
										alt='product image'
									/>
									<Button
										variant={'destructive'}
										className='absolute top-0 right-0'
										type='button'
										onClick={onDeleteImage}
									>
										<X />
									</Button>
								</div>
							)}
							{!watchImage && (
								<UploadDropzone
									className='rounded-none'
									endpoint={'imageUploader'}
									onClientUploadComplete={res => {
										form.setValue('image', res[0].ufsUrl)
										form.setValue('imageKey', res[0].key)
									}}
									config={{ appendOnPaste: true, mode: 'auto' }}
									appearance={{ container: { height: 200, padding: 10 } }}
								/>
							)}

							<Button type='submit' className='w-full' disabled={isLoading}>
								Submit {isLoading && <Loader className='animate-spin' />}
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct
