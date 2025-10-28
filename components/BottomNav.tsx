'use client'

import { useRouter, usePathname } from 'next/navigation'
import Dock from '@/components/ui/dock'
import { Home, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  // Determine active item based on pathname
  const getActiveItem = (): string | undefined => {
    if (pathname === '/') return 'Home'
    if (pathname.startsWith('/shop') || pathname.startsWith('/eubiosis-bottle')) return 'Shop'
    return undefined
  }

  useEffect(() => {
    // Hide nav initially on home page and shop page
    if (pathname === '/' || pathname === '/shop' || pathname.startsWith('/eubiosis-bottle')) {
      setIsVisible(false)
      
      const handleScroll = () => {
        const scrollTop = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        
        // Check if user is at the bottom of the page (within 50px)
        const isAtBottom = scrollTop + windowHeight >= documentHeight - 50
        
        if (isAtBottom) {
          // Hide nav when at bottom
          setIsVisible(false)
        } else if (scrollTop > 100) {
          // Show nav when scrolled down 100px or more (but not at bottom)
          setIsVisible(true)
        } else {
          // Hide nav when at top
          setIsVisible(false)
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      // Show nav immediately on other pages (like funnel)
      setIsVisible(true)
    }
  }, [pathname])

  const dockItems = [
    {
      icon: Home,
      label: 'Home',
      onClick: () => router.push('/'),
    },
    {
      icon: ShoppingCart,
      label: 'Shop',
      onClick: () => router.push('/eubiosis-bottle/size-s/quantity-1'),
    },
  ]

  if (!isVisible) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
      <Dock items={dockItems} activeItem={getActiveItem()} />
    </nav>
  )
}
