import Link from 'next/link'
import React from 'react'

const Book = ({ book }) => {
    return (
        <>
            <h1>{book.title}</h1>
            <Link href="/books">Books List</Link>
        </>
    )
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await response.json()
    return {
        paths: data.map(book => {
            return { params: { id: String(book.id) } }
        }),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context
    console.log(context.params.id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.id}`)
    const data = await response.json()
    return {
        props: {
            book: data
        }
    }
}

export default Book