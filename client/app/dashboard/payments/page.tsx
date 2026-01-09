import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { products } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

const PaymentsPage = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Payments</h1>
				<Filter showCategory={false} />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>A list of your recent payments.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow key={product._id}>
							<TableCell>{formatPrice(product.price)}</TableCell>
							<TableCell>Toss bank</TableCell>
							<TableCell>{product.title}</TableCell>
							<TableCell>10-Nov 2024</TableCell>
							<TableCell className='text-right'>
								{formatPrice(product.price)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default PaymentsPage
