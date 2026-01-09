import WishListCard from '@/components/card/wish-list.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { products } from '@/lib/constants'
import { Separator } from '@radix-ui/react-separator'

const WatchListPage = () => {
	return (
		<>
			<h1 className='text-xl font-bold'>Wich list</h1>
			<Separator className='my-3' />

			<Filter />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{products.map(product => (
					<WishListCard key={product._id} product={product} />
				))}
			</div>

			<Pagination />
		</>
	)
}

export default WatchListPage
