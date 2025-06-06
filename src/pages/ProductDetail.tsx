import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  // Mock product data (in a real app, you'd fetch this based on the ID)
  const product = {
    id: parseInt(id || "1"),
    name: "Wireless Headphones",
    price: 99.99,
    image: "photo-1531297484001-80022131f5a1",
    rating: 4.5,
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation technology. Experience crystal-clear audio quality with deep bass and crisp highs. Perfect for music lovers, commuters, and professionals who demand the best in audio technology.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 15 minutes = 3 hours playback",
      "Bluetooth 5.0 connectivity",
      "Comfortable over-ear design",
      "Built-in microphone for calls"
    ],
    specifications: {
      "Brand": "AudioTech",
      "Model": "AT-WH100",
      "Color": "Black",
      "Weight": "280g",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 ohms"
    },
    inStock: true,
    reviews: 156
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={`https://images.unsplash.com/${product.image}?w=600&h=600&fit=crop`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded border cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={`https://images.unsplash.com/${product.image}?w=150&h=150&fit=crop`}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="text-3xl font-bold text-primary mb-4">
                ${product.price}
              </div>

              {product.inStock ? (
                <Badge variant="default" className="bg-green-500">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-16 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
