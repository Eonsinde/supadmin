import { Skeleton } from 'primereact/skeleton';


const ProductsLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-4">
        <div className="xl:w-full">
            <Skeleton height="13rem" className="mb-2"></Skeleton>
        </div>
        <div className="xl:w-full">
            <Skeleton height="13rem" className="mb-2"></Skeleton>
        </div>
        <div className="hidden lg:block xl:w-full">
            <Skeleton height="13rem" className="mb-2"></Skeleton>
        </div>
        <div className="hidden xl:block xl:w-full">
            <Skeleton height="13rem" className="mb-2"></Skeleton>
        </div>
    </div>
  )
}

export default ProductsLoader
