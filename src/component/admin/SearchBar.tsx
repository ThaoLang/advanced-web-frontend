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

  const handleSearch = useDebouncedCallback((term: string) => {
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
  }, 400);


  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Search</span>
      </label>
      <div className="relative">
        <input
          type="text"
          className="input input-bordered peer block w-full 
          rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={props.placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <FaMagnifyingGlass className="absolute top-4 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}