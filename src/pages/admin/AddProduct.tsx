import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
  });

  const [images, setImages] = useState<string[]>([]);

  const categories = [
    "Electronics",
    "Computers",
    "Furniture",
    "Fashion",
    "Books",
    "Sports",
    "Home & Garden",
    "Toys & Games"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setProductData({
      ...productData,
      category: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these files to a server
    // For now, we'll just create placeholder URLs
    const newImages = files.map((file, index) => 
      `photo-148850810${index + images.length + 23}-c5249f4df085`
    );
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product Added Successfully",
        description: `${productData.name} has been added to your store.`,
      });
      navigate("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Add New Product</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Product Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter product description"
                        value={productData.description}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={productData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          placeholder="0"
                          value={productData.stock}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={handleCategoryChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          name="sku"
                          placeholder="SKU-001"
                          value={productData.sku}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={productData.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                      <Input
                        id="dimensions"
                        name="dimensions"
                        placeholder="20 x 15 x 10"
                        value={productData.dimensions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product Images */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop images or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload">
                        <Button type="button" variant="outline" className="cursor-pointer">
                          Select Images
                        </Button>
                      </Label>
                    </div>

                    {/* Image Preview */}
                    {images.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Images</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={`https://images.unsplash.com/${image}?w=200&h=200&fit=crop`}
                                alt={`Product ${index + 1}`}
                                className="w-full aspect-square object-cover rounded border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Adding Product..." : "Add Product"}
                  </Button>
                  <Link to="/admin/dashboard" className="w-full">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
