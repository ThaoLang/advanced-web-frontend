'use client';
import { 
    usePathname, 
    useRouter, 
    useSearchParams 
} from 'next/navigation';

interface PaginationBarProp {
    total: number;
    limit: number;
    current: number;

    onChange: (page: number) => void;
}

function calculatePaginationRange(currentPage: number, totalPages: number, pageLimit: number) {
    // console.log(currentPage, totalPages, pageLimit);
    let minPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    let maxPage = Math.min(totalPages, minPage + pageLimit - 1);

    // Adjust minPage if maxPage reaches totalPages
    minPage = Math.max(1, maxPage - pageLimit + 1);

    return { minPage, maxPage };
}

const Pagination = (props: PaginationBarProp) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    let items = [];

    const { minPage, maxPage } = calculatePaginationRange(props.current, props.total, props.limit);

    if (props.current > 1) {
        items.push(
            <li onClick={() => { props.onChange(props.current - 1); createPageURL(props.current-1); }}>
                <p className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                    <span className="sr-only">Previous</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </p>
            </li>
        );
    }

    for (let page = minPage; page <= maxPage; page++) {
        items.push(
            page === props.current ? (
                <li onClick={() => { props.onChange(page); createPageURL(page); }}>
                    <p
                        aria-current="page"
                        className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    >
                        {props.current}
                    </p>
                </li>
            ) : (
                <li onClick={() => { props.onChange(page); createPageURL(page); }}>
                    <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                        {page}
                    </p>
                </li>
            )
        );
    }

    if (props.current < props.total) {
        items.push(
            <li onClick={() => {props.onChange(props.current + 1); createPageURL(props.current + 1)}}>
                <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                    <span className="sr-only">Next</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                </p>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-5 text-base">{items}</ul>
        </nav>
    );
}

export default Pagination;