import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomers } from "../requests";
import CustomerLoader from "../components/customer/CustomerLoader";
import { BsFiletypeCsv, BsFileEarmarkExcel } from "react-icons/bs";
import { saveAsExcelFile } from "../utils";


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

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(customers);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'customers');
        });
    };

    const TableHeader = (
        <div className="bg-white dark:bg-slate-900 flex justify-between items-center">
            <h4 className="m-0 text-black dark:text-white text-lg">Manage Customers</h4>
            <div className="flex justify-between items-center space-x-2">
                <input 
                    type="text"
                    onChange={(e) => setGlobalFilter(e.target.value)} 
                    className={`text-black dark:text-white py-2 px-3 w-full border-solid border-2 border-neutral-200 dark:border-white/20 rounded-md shadow-sm 
                            focus:border-neutral-300 focus:dark:border-white/40 focus:ring-4 focus:ring-neutral-300/30 dark:focus:ring-neutral-100/10 outline-none  
                            transition ease-in-out delay-150 bg-transparent placeholder:text-neutral-400 placeholder:dark:text-white/50`} 
                    value={globalFilter}
                    placeholder='Search...'
                />
                <div className="flex justify-between items-center space-x-2">
                    <button 
                        className="text-2xl bg-neutral-200 hover:bg-neutral-300 dark:bg-slate-800 hover:dark:bg-slate-700 text-black dark:text-white p-[0.6rem] rounded-md"
                        onClick={exportCSV}
                        title="Export CSV"
                    >
                        <BsFiletypeCsv />
                    </button>
                    <button 
                        className="text-2xl bg-neutral-200 hover:bg-neutral-300 dark:bg-slate-800 hover:dark:bg-slate-700 text-black dark:text-white p-[0.6rem] rounded-md"
                        onClick={exportExcel}
                        title="Export Excel"
                    >
                        <BsFileEarmarkExcel />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
    <>
        <header className="">
            <h1 className="text-black dark:text-white font-bold text-lg md:text-xl">Customers</h1>
            <p className="text-neutral-700 dark:text-neutral-300">List of customers</p>
        </header>
        {isLoading ?
        <div className="flex-grow overflow-y-auto scrollbar-hide py-2">
            <CustomerLoader />
        </div>
        :  
        <>
            {(customers?.length <= 0)
            ?
            <p className="text-black dark:text-white">No customers added yet</p>
            : 
            <DataTable 
                ref={customersDT} 
                scrollable
                scrollHeight="630px"
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    minWidth: "50rem"
                }}
                value={customers} 
                selection={selectedCustomers} 
                onSelectionChange={(e) => setSelectedCustomers(e.value)}
                dataKey="_id"  
                paginator 
                rows={10} 
                rowsPerPageOptions={[5, 10, 25]}
                // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers" 
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
            </DataTable>}
        </>}
    </>);
}
 
export default Customers;