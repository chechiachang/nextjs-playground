import { Metadata } from 'next'
import Link from 'next/link'
 
export const metadata: Metadata = {
  title: 'Sport Center Statistics',
  description: 'Sport Center Statistics',
}
 
export default function Page() {
  return (
    <div>
      <h1> Welcome to Sport Center Statistics</h1>
      <div>
        <Link href="/tictactoe">Tic-Tac-Toe</Link>
      </div>
      <div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  )
} 
