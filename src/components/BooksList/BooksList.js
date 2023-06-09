import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

import FilterBar from "../FilterBar/FilterBar";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context";
import { getBooksBySearchTerm } from "../../api/booksApi";

function BooksList() {
    const { search, filters } = useContext(SearchContext);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    useEffect(() => {
        if (search) {
            getBooksBySearchTerm(search, currentPage, booksPerPage, filters)
                // fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
                // .then((response) => response.json())
                // .then((data) => {
                .then((response) => {
                    // if (data.items) {
                    if (response.data.items) {
                        // setBooks(data.items);
                        setBooks(response.data.items);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [search, currentPage, filters]);

    const memoizedBooks = useMemo(
        () =>
            books.map((book, index) => (
                <li key={index}>
                    <Link to={`/book/${book.id}`} title={book.volumeInfo.title}>
                        {book.volumeInfo.title}
                    </Link>
                </li>
            )),
        [books]
    );

    return (
        <div className="books">
            <div className="container">
                {search && books.length > 0 && <h1>Books</h1>}

                {search && <FilterBar />}

                <ul>{memoizedBooks}</ul>

                {search && books.length > 0 && (
                    <>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
export default BooksList;
