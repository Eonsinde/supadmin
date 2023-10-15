import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { getTransactions } from "../requests";
import CustomerLoader from "../components/customer/CustomerLoader";
import { BsFiletypeCsv, BsFileEarmarkExcel } from "react-icons/bs";
import { saveAsExcelFile } from "../utils";


const Transactions = () => {
    const transactionsDTRef = useRef(null);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState({
        filters: null,
        first: 0,
        multiSortMeta: [],
        rows: null,
        sortField: "",
        sortOrder: 2
    });
    // prime react functions
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedTransactions, setSelectedTransactions] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const { data, isLoading, isFetching, isPreviousData, isError } = useQuery(
        ['all-transactions', page, pageSize, sort, searchQuery], 
        () => getTransactions(page, pageSize, sort, searchQuery),
        { refetchOnWindowFocus: false, keepPreviousData : true, refetchOnMount: false }
    );

    // console.log("isLoading:", isLoading, "isFetching:", isFetching);
    // console.log(data);
    console.log("sort:", sort);

    const exportCSV = () => {
        transactionsDTRef.current.exportCSV();
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data.transactions);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'transactions');
        });
    };

    const handleSortOrder = (currentOrder) => {
        switch (currentOrder) {
            case 1:
                return -1;
            case -1:
                return 0;
            case 0:
            case 2:
            default: 
                return 1;
        }
    }

    const onPageChange = (event) => {
        setFirst(event.first);
        setPage(event.page+1);
        setPageSize(event.rows);
    };

    const TableHeader = (
        <div className="bg-white dark:bg-slate-900 flex justify-between items-center">
            <h4 className="m-0 text-black dark:text-white text-lg">Manage Transactions</h4>
            <div className="flex justify-between items-center space-x-2">
                <input 
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value.trim())} 
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
            <h1 className="text-black dark:text-white font-bold text-lg md:text-xl">Transactions</h1>
            <p className="text-neutral-700 dark:text-neutral-300">List of transactions</p>
        </header>
        {isLoading && !isError ?
        <div className="flex-grow overflow-y-auto scrollbar-hide py-2">
            <CustomerLoader />
        </div>
        :  
        <>
            {(data?.length <= 0)
            ?
            <p className="text-black dark:text-white">No transactions added yet</p>
            :
            <DataTable 
                ref={transactionsDTRef} 
                scrollable
                scrollHeight="700px"
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    // minWidth: "50rem"
                }}
                loading={isFetching && isPreviousData}
                dataKey="_id"  
                value={data.transactions} 
                selection={selectedTransactions} 
                onSelectionChange={(e) => setSelectedTransactions(e.value)}
                // sortOrder={sort.sortOrder === 2 ? null : sort.sortOrder}
                // sortField={sort.sortField}
                onSort={(e) => setSort(prevState => ({
                    ...prevState,
                    sortField: e.sortField.includes("products") ? "products" : e.sortField,
                    sortOrder: handleSortOrder(prevState.sortOrder)
                }))}
                removableSort
                globalFilter={globalFilter} 
                header={TableHeader}
            >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="userId" header="User" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="cost" header="Cost" sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="products.length" header="Products" sortable style={{ minWidth: '5rem' }}></Column>
            </DataTable>}
            <Paginator 
                className="border-0 rounded-none"
                first={first} 
                rows={pageSize} 
                totalRecords={data.total} 
                rowsPerPageOptions={[10, 20, 30]} 
                onPageChange={onPageChange} 
            /> 
        </>}
    </>);
}
 
export default Transactions;