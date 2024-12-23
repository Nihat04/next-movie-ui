import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='p-5 bg-zinc-800'>
        <nav>
            <ul className="flex gap-5">
                <Link href={'/folders'}>Папки</Link>
                <Link href={'/roulette'}>Рулетка</Link>
            </ul>
        </nav>
    </header>
  )
}
