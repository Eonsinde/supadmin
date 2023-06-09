import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { getCustomers } from "../requests";
import Product from "../components/product/Product";
import CustomerLoader from "../components/customer/CustomerLoader";
import CustomModal from "../components/modal/Modal";


const Customers = () => {
    const customersDT = useRef(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const { data: customers, isLoading } = useQuery('all-customers', () => getCustomers());

    // console.log(customers);


    const exportCSV = () => {
        customersDT.current.exportCSV();
    };

    const TableHeader = (
        <div className="bg-white dark:bg-slate-900 flex justify-between items-center">
            <h4 className="m-0 text-black dark:text-white text-lg">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <input 
                    type="text"
                    onChange={(e) => setGlobalFilter(e.target.value)} 
                    className={`text-black dark:text-white py-2 px-3 w-full border-solid border-2 border-neutral-200 dark:border-white/20 rounded-md shadow-sm 
                            focus:border-neutral-300 focus:dark:border-white/40 focus:ring-4 focus:ring-neutral-300/30 dark:focus:ring-neutral-100/10 outline-none  
                            transition ease-in-out delay-150 bg-transparent placeholder:text-neutral-400 placeholder:dark:text-white/50`} 
                    value={globalFilter}
                    placeholder='Search...'
                />
            </span>
        </div>
    );

    return (
    <>
        <header className="">
            <h1 className="text-black dark:text-white font-bold text-lg md:text-xl">Customers</h1>
            <p className="text-neutral-700 dark:text-neutral-300">List of customers</p>
        </header>
        <section className="flex-grow overflow-hidden">
            {isLoading ?
            <div className="h-full overflow-y-auto scrollbar-hide py-2">
                <CustomerLoader />
            </div>
            :  
            <div className="h-full py-2 overflow-y-auto scrollbar-hide">
                {customers?.length <= 0
                ?
                <p className="text-black dark:text-white">No customers added yet</p>
                : 
                <> 

                    <DataTable 
                        ref={customersDT} 
                        scrollable
                        style={{ minWidth: '50rem', height: "100%" }}
                        value={customers} 
                        selection={selectedCustomers} 
                        onSelectionChange={(e) => setSelectedCustomers(e.value)}
                        dataKey="_id"  
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                        globalFilter={globalFilter} 
                        header={TableHeader}
                    >
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="fullName" header="Full Name" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="username" header="Username" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="phoneNumber" header="Phone No"></Column>
                        <Column field="occupation" header="Occupation" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="city" header="City" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="country" header="Country" sortable style={{ minWidth: '16rem' }}></Column>
                    </DataTable>
                </>}
            </div>} 
        </section>
        {/* {selectedCustomer && (<CustomModal showCloseBtn handleClose={() => setSelectedCustomer(null)}>
            <AnimatePresence>
                <ModalProduct data={selectedCustomer} />
            </AnimatePresence>
        </CustomModal>)}        */}
    </>);
}
 
export default Customers;