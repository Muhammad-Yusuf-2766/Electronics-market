import { getFavourites } from '@/actions/user.action'
import WishListCard from '@/components/card/wish-list.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { SearchParams } from '@/types'
import { Separator } from '@radix-ui/react-separator'
import { FC } from 'react'
interface Props {
	searchParams: SearchParams
}

const WatchListPage: FC<Props> = async props => {
	const searchParams = await props.searchParams

	const res = await getFavourites({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
		category: `${searchParams.category || ''}`,
	})

	const favourites = res.data?.products
	const isNext = res.data?.isNext || false
	return (
		<>
			<h1 className='text-xl font-bold'>Wich list</h1>
			<Separator className='my-3' />

			<Filter />

			{favourites && favourites.length === 0 && (
				<div className='text-center mt-3 '>No wish list found</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3'>
				{favourites &&
					favourites.map(product => (
						<WishListCard key={product._id} product={product} />
					))}
			</div>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default WatchListPage
