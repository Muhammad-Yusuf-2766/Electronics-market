import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { FC } from 'react'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Seleor e-commerce',
	description: 'Seleor e-commerce website built with Next.js',
	icons: { icon: '/favicon.png' },
}

const RootLayout: FC<ChildProps> = ({ children }) => {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={`${geistMono.className} antialiased`}>
				<Navbar />
				<main className='container max-w-7xl mt-24 mx-auto px-5'>
					{children}
				</main>
				<Toaster />
			</body>
		</html>
	)
}

export default RootLayout
