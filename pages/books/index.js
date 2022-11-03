import Link from 'next/link'
import React from 'react'

const books = ({ books }) => {

    async function handleDelete(e, book) {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE' // Important
            })
        })

        if (response.ok) {
            window.location.href = '/books'
        }
    }

    return (
        <>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link href={`/books/${book.id}`}>{book.title}</Link>
                        <span> - </span>
                        <Link href={`/books/${book.id}/edit`}>Edit</Link>
                        <span> - </span>
                        <form
                            style={{ display: 'inline' }}
                            onSubmit={(e) => handleDelete(e, book)}
                        >
                            <button>Delete</button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/books/create">Create Book</Link>
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await response.json()

    return {
        props: {
            books: data
        }
    }
}

export default books