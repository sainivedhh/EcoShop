import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            EcoShop
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              My Account
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Account
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart (0)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
