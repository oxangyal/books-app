import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { getBooksBySearchTerm } from '../../api/booksApi';

function BooksList({ search }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (search) {
            getBooksBySearchTerm(search)
            // fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            // .then((response) => response.json())
                // .then((data) => {
                .then((response) => {
                // if (data.items) {
                    if (response.data.items) {
                    // setBooks(data.items);
                    setBooks(response.data.items);
                } else {
                    setBooks([]);
                }
            })
            .catch((error) => console.error(error));
        }
    }, [search]);

	return (
		<div className="books">
			<h1>Books</h1>

			<ul>
				{books.map((book, index) => (
                    <li key={index}>
                        <Link to={`/book/${book.id}`} title={book.volumeInfo.title}>
                        {book.volumeInfo.title} 
                        </Link>
                            {/* <a title={book.volumeInfo.title} href="#" onClick={() => onSelectBook(book.id)}>
							{book.volumeInfo.title}
						</a> */}
					</li>
				))}
			</ul>
		</div>
	);
}

export default BooksList;