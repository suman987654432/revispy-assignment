"use client"

import { Search, ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { name: "Categories", href: "#" },
        { name: "Sale", href: "#" },
        { name: "Clearance", href: "#" },
        { name: "New stock", href: "#" },
        { name: "Trending", href: "#" },
    ]

    return (
        <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
                <div className="flex items-center justify-end gap-x-4">
                    <span className="text-sm text-gray-600 hidden sm:inline">Help</span>
                    <span className="text-sm text-gray-600 hidden sm:inline">Orders & Returns</span>
                    <span className="text-sm text-gray-600">Hi, John</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="lg:hidden mr-4">
                            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                                    <SheetHeader>
                                        <SheetTitle>ECOMMERCE</SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col mt-6">
                                        {navLinks.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                className="py-3 text-gray-900 hover:text-gray-700 border-b border-gray-100"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <h1 className="text-2xl font-bold">ECOMMERCE</h1>

                        <nav className="hidden lg:flex lg:ml-8 space-x-8">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className="text-gray-900 hover:text-gray-700">
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Search className="h-5 w-5 text-gray-600" />
                        <ShoppingCart className="h-5 w-5 text-gray-600" />
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <span className="text-sm">Get 10% off on business sign up</span>
                </div>
            </div>
        </header>
    )
}

export default Header