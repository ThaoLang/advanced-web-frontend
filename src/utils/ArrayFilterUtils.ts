export default function filterAndSortArray(
    array: any[],
    query: string,
    sortBy: string | null,
    orderBy: string,
    filterBy: ArrayLike<unknown> | { [s: string]: unknown; }) {

    const normalizedQuery = query.trim().toLowerCase();

    // console.log("Filter Props:", array, query, sortBy, filterBy);

    const filteredArray = array.filter(item => {
        const includesQuery = Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)
        );

        const passesFilters = !filterBy || Object.entries(filterBy).every(([key, value]) =>
            value === null || item[key] === value
        );

        return includesQuery && passesFilters;
    });

    // console.log("Filter before sort: ", filteredArray);

    if (sortBy) {
        // Sort the filtered array based on the specified sortBy field and orderBy
        filteredArray.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return orderBy === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            // If values are not strings, use a simple comparison
            return orderBy === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    // console.log("Filter after sort: ", filteredArray);

    return filteredArray;
}