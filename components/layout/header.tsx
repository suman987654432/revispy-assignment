import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
    { href: "#", label: "Categories" },
    { href: "#", label: "Sale" },
    { href: "#", label: "Clearance" },
    { href: "#", label: "New stock" },
    { href: "#", label: "Trending" },
]

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-black" >
                            ECOMMERCE
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-600 hover:text-black"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
