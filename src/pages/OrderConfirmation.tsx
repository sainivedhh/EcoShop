import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const OrderConfirmation = () => {
  const order = {
    id: "ORD-123456",
    date: new Date().toLocaleDateString(),
    estimatedDelivery: "3-5 business days",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 2,
        image: "photo-1531297484001-80022131f5a1"
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 299.99,
        quantity: 1,
        image: "photo-1486312338219-ce68d2c6f44d"
      }
    ],
    subtotal: 499.97,
    shipping: 9.99,
    tax: 39.98,
    total: 549.94,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order {order.id}</CardTitle>
                  <p className="text-muted-foreground">Placed on {order.date}</p>
                </div>
                <Badge variant="default" className="bg-green-500">
                  Confirmed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Processing</p>
                    <p className="text-sm text-muted-foreground">Order confirmed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Shipping</p>
                    <p className="text-sm text-muted-foreground">Will ship soon</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Delivery</p>
                    <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold">Order Items</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 overflow-hidden rounded border">
                      <img
                        src={`https://images.unsplash.com/${item.image}?w=200&h=200&fit=crop`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-semibold">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Cash on Delivery</Badge>
                <span className="text-sm text-muted-foreground">
                  You will pay ${order.total.toFixed(2)} when your order is delivered.
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto">
                View Order History
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              You will receive an email confirmation shortly with tracking information.
            </p>
            <p className="mt-2">
              Questions? Contact our customer support at support@ecoshop.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
