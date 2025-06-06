import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, User, Settings } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    totalOrders: 12,
    totalSpent: 1250.50
  });

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 199.98,
      items: [
        { name: "Wireless Headphones", quantity: 2, price: 99.99 }
      ]
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 299.99,
      items: [
        { name: "Smart Watch", quantity: 1, price: 299.99 }
      ]
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 750.49,
      items: [
        { name: "Laptop Computer", quantity: 1, price: 1299.99 },
        { name: "Gaming Chair", quantity: 1, price: 449.99 }
      ]
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: "Gaming Keyboard",
      price: 149.99,
      image: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 2,
      name: "4K Monitor",
      price: 399.99,
      image: "photo-1498050108023-c5249f4df085"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Shipped":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Member since:</span>
                    <span>{user.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total orders:</span>
                    <span>{user.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total spent:</span>
                    <span>${user.totalSpent.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  <Link to="/products">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>

                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order {order.id}</CardTitle>
                          <CardDescription>Placed on {order.date}</CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <div className="text-lg font-semibold mt-1">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-4">
                <h2 className="text-xl font-semibold">My Wishlist</h2>

                {wishlist.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                    <Link to="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <div className="w-20 h-20 overflow-hidden rounded border">
                              <img
                                src={`https://images.unsplash.com/${item.image}?w=200&h=200&fit=crop`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-2">{item.name}</h3>
                              <p className="text-lg font-bold text-primary">${item.price}</p>
                              <div className="mt-3 space-x-2">
                                <Button size="sm">Add to Cart</Button>
                                <Button variant="outline" size="sm">Remove</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <input 
                          type="text" 
                          className="w-full mt-1 p-2 border rounded" 
                          defaultValue="John" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full mt-1 p-2 border rounded" 
                          defaultValue="Doe" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        className="w-full mt-1 p-2 border rounded" 
                        defaultValue="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full mt-1 p-2 border rounded" 
                        defaultValue="+1 (555) 123-4567" 
                      />
                    </div>
                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full mt-1 p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <input 
                        type="password" 
                        className="w-full mt-1 p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full mt-1 p-2 border rounded" 
                      />
                    </div>
                    <Button>Change Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
