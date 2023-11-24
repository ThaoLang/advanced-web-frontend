'use client';
 
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
 
interface SearchProps {
  currentPage: number;
  placeholder: string;
  setQuery: (term: string) => void;
}

export default function Search(props: SearchProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();  

    const handleSearch = useDebouncedCallback((term: string) =>  {
        // console.log(`Searching... ${term}`);
        props.setQuery(term);
        const params = new URLSearchParams(searchParams);
        params.set('page', props.currentPage.toString());
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={props.placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <FaMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}