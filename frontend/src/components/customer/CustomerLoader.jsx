import { Skeleton } from 'primereact/skeleton';


const CustomerLoader = () => {
  return (
    <div className="flex flex-col space-y-2">
        <div className="xl:w-full">
            <Skeleton height="3rem"></Skeleton>
        </div>
        <div className="xl:w-full">
            <Skeleton height="3rem"></Skeleton>
        </div>
        <div className="hidden lg:block xl:w-full">
            <Skeleton height="3rem"></Skeleton>
        </div>
        <div className="hidden xl:block xl:w-full">
            <Skeleton height="3rem"></Skeleton>
        </div>
    </div>
  )
}

export default CustomerLoader
