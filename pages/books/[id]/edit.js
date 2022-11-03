import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Edit = ({ book }) => {
    const router = useRouter()
    const [title, setTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submiting, setSubmiting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmiting(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                _method: 'PATCH' // Important
            })
        })

        console.log(response, response.ok)

        if (response.ok) {
            setErrors([])
            setTitle('')
            router.push('/books')
        } else {
            const data = await response.json()
            setErrors(data.errors)
        }

        setSubmiting(false)
    }
    return (
        <>
            <h1>Create Books</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    disabled={submiting}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button disabled={submiting}>
                    {submiting ? 'Sending' : 'Edit'}
                </button>
                {errors.title && (
                    <span style={{ color: 'red', display: 'block' }}>{errors.title}</span>
                )}
            </form>
            <br />
            <Link href="/books">Books List</Link>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.id}`)
    const data = await response.json()

    return {
        props: {
            book: data
        }
    }
}

export default Edit