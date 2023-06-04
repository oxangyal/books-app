import { useEffect, useState } from 'react';

function stripHtmlTags(html) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || div.innerText || '';
}

function BookDetails({ bookId }) {
	const [book, setBook] = useState(null);

	useEffect(() => {
		fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
			.then((response) => response.json())
			.then((data) => {
				setBook(data);
			})
			.catch((error) => console.error(error));
	}, [bookId]);

    if (!book) {
        return <div>Loading...</div>
    }
	const description = stripHtmlTags(book.volumeInfo.description);

	return (
		<div className="book">
			<h1>{book.volumeInfo.title}</h1>
			<h2>{book.volumeInfo.authors.join(', ')}</h2>
			<p>{description}</p>
			<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />

			
			<h3 className="country">{book.volumeInfo.country}</h3>
			<h3 className="language">Language:<span> {(book.volumeInfo.language).toUpperCase()} </span></h3>
			<h3> Category: <span>{book.volumeInfo.categories}</span></h3>
			<h3> Link:  <a href={book.volumeInfo.previewLink}> {book.volumeInfo.previewLink}</a></h3>
			<h3 className="category">Date of Publishing: <span>{book.volumeInfo.publishedDate} </span></h3>
			
		</div>
	);
}

export default BookDetails;