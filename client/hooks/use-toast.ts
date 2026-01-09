'use client'

import * as React from 'react'
import { toast as sonnerToast } from 'sonner'

type ToastActionElement = React.ReactNode

type ToastProps = {
	title?: React.ReactNode
	description?: React.ReactNode
	action?: ToastActionElement
	// xohlasangiz keyin variant/duration qo‘shasiz
	duration?: number
}

function toast(props: ToastProps) {
	const id = sonnerToast(props.title ?? '', {
		description: props.description,
		action: props.action as any, // agar action ni button qilib berayotgan bo‘lsangiz
		duration: props.duration,
	})

	return {
		id: String(id),
		dismiss: () => sonnerToast.dismiss(id),
		update: (next: ToastProps) =>
			sonnerToast(next.title ?? props.title ?? '', {
				id,
				description: next.description ?? props.description,
				action: (next.action ?? props.action) as any,
				duration: next.duration ?? props.duration,
			}),
	}
}

// Eski code `const { toast } = useToast()` deb chaqirayotgan bo‘lsa:
function useToast() {
	return {
		toast,
		dismiss: (toastId?: string) =>
			toastId ? sonnerToast.dismiss(toastId) : sonnerToast.dismiss(),
		toasts: [], // compatibility uchun (agar UI’da toasts o‘qilmasa)
	}
}

export { toast, useToast }
