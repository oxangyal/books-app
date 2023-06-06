import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import axios from 'axios';
import { getBookById } from '../../../api/booksApi';

function BookDetails({ bookId }) {
	const [book, setBook] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		getBookById(bookId)
		// axios
		// 	.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`) //axios 
		// fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`) //fetch
			// .then((response) => response.json()) it was for fetch
			// .then((data) => {
			.then((response) => {
				setBook(response.data);
				// setBook(data);
				setError(false);
			})
			.catch((error) => {
				console.error(error);
				setError(true);
			});
	}, [bookId]);

	// wait for the book when it comes
    if (!book) {
        return <div>Loading...</div>
    }

	if (error) {
	return <div className="container">Book not found</div>
	}
	
	return (
		<div className="book">
			<h1>{book.volumeInfo.title ? book.volumeInfo.title : 'No title' }</h1>
			<h2>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</h2>
			<div>{book.volumeInfo.description ? parse(book.volumeInfo.description) : 'No description available'}</div>
			{book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}


			<h3 className="category">Date of Publishing: <span>{book.volumeInfo.publishedDate} </span></h3>

			{/* <h3 className="country">{book.volumeInfo.country}</h3>
			<h3 className="language">Language:<span> {(book.volumeInfo.language).toUpperCase()} </span></h3> */}
		</div>
	);
}

export default BookDetails;