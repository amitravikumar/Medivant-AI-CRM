import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Search,
  Filter,
  ShoppingCart,
  Package,
  Star,
  Check,
  Truck,
  Info,
  Plus,
  Minus
} from "lucide-react";

interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  price: number;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  specifications: Record<string, string>;
  compatibleModels: string[];
  deliveryTime: string;
}

interface PartsCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartsCatalog({ isOpen, onClose }: PartsCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [cart, setCart] = useState<{ part: Part; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();

  const mockParts: Part[] = [
    {
      id: "P001",
      name: "Oil Filter",
      partNumber: "GRV-OF-2024",
      category: "Filters",
      price: 450,
      inStock: true,
      stockQuantity: 25,
      rating: 4.5,
      reviews: 128,
      description: "High-performance oil filter for Greaves generators. Ensures optimal engine performance.",
      image: "/placeholder.svg",
      specifications: {
        "Thread Size": "M20 x 1.5",
        "Height": "95mm",
        "Diameter": "76mm",
        "Material": "Synthetic blend"
      },
      compatibleModels: ["GX-500", "GX-750", "GX-1000"],
      deliveryTime: "2-3 days"
    },
    {
      id: "P002",
      name: "Fuel Pump",
      partNumber: "GRV-FP-2024",
      category: "Engine",
      price: 2850,
      inStock: true,
      stockQuantity: 8,
      rating: 4.8,
      reviews: 67,
      description: "Original Greaves fuel pump assembly with electronic control.",
      image: "/placeholder.svg",
      specifications: {
        "Voltage": "12V DC",
        "Pressure": "3.5 bar",
        "Flow Rate": "120 L/h",
        "Material": "Aluminum alloy"
      },
      compatibleModels: ["GX-750", "GX-1000", "GX-1500"],
      deliveryTime: "3-5 days"
    },
    {
      id: "P003",
      name: "Control Panel Display",
      partNumber: "GRV-CPD-2024",
      category: "Electronics",
      price: 5200,
      inStock: false,
      stockQuantity: 0,
      rating: 4.3,
      reviews: 45,
      description: "Digital control panel with touchscreen interface for generator monitoring.",
      image: "/placeholder.svg",
      specifications: {
        "Screen Size": "7 inch",
        "Resolution": "800x480",
        "Interface": "RS485/CAN",
        "Operating Temp": "-20°C to +70°C"
      },
      compatibleModels: ["GX-1000", "GX-1500", "GX-2000"],
      deliveryTime: "7-10 days"
    },
    {
      id: "P004",
      name: "Air Filter",
      partNumber: "GRV-AF-2024",
      category: "Filters",
      price: 320,
      inStock: true,
      stockQuantity: 45,
      rating: 4.6,
      reviews: 203,
      description: "High-efficiency air filter for optimal engine performance and longevity.",
      image: "/placeholder.svg",
      specifications: {
        "Length": "285mm",
        "Width": "185mm",
        "Height": "65mm",
        "Filtration": "99.5% efficiency"
      },
      compatibleModels: ["GX-500", "GX-750"],
      deliveryTime: "1-2 days"
    }
  ];

  const categories = ["all", "Engine", "Filters", "Electronics", "Electrical", "Cooling"];

  const filteredParts = mockParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (part: Part) => {
    const existingItem = cart.find(item => item.part.id === part.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.part.id === part.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { part, quantity: 1 }]);
    }
    toast({
      title: "Added to Cart",
      description: `${part.name} added to your cart`,
    });
  };

  const updateCartQuantity = (partId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.part.id !== partId));
    } else {
      setCart(cart.map(item => 
        item.part.id === partId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.part.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Order Placed Successfully",
      description: `Order for ₹${getTotalPrice().toFixed(2)} has been placed. You will receive a confirmation email shortly.`,
    });
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Greaves Parts Catalog
            {cart.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCart(true)}
                className="ml-auto"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Cart ({cart.length})
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Parts</TabsTrigger>
            <TabsTrigger value="search">Advanced Search</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search parts by name or part number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredParts.map((part) => (
                <Card key={part.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{part.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{part.partNumber}</p>
                      </div>
                      <Badge variant={part.inStock ? "default" : "destructive"}>
                        {part.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(part.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({part.reviews})</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {part.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹{part.price}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Truck className="w-4 h-4" />
                        {part.deliveryTime}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPart(part)}
                        className="flex-1"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToCart(part)}
                        disabled={!part.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Part Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Generator Model</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GX-500">GX-500</SelectItem>
                        <SelectItem value="GX-750">GX-750</SelectItem>
                        <SelectItem value="GX-1000">GX-1000</SelectItem>
                        <SelectItem value="GX-1500">GX-1500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500">₹0 - ₹500</SelectItem>
                        <SelectItem value="500-2000">₹500 - ₹2,000</SelectItem>
                        <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                        <SelectItem value="5000+">₹5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Availability</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Parts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Part Details Modal */}
        <Dialog open={!!selectedPart} onOpenChange={() => setSelectedPart(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPart?.name}</DialogTitle>
            </DialogHeader>
            {selectedPart && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Specifications</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(selectedPart.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compatible Models</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPart.compatibleModels.map(model => (
                        <Badge key={model} variant="outline">{model}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">₹{selectedPart.price}</span>
                  <Button onClick={() => addToCart(selectedPart)} disabled={!selectedPart.inStock}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Cart Modal */}
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Shopping Cart</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground">Your cart is empty</p>
              ) : (
                <>
                  {cart.map(({ part, quantity }) => (
                    <div key={part.id} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex-1">
                        <h4 className="font-medium">{part.name}</h4>
                        <p className="text-sm text-muted-foreground">{part.partNumber}</p>
                        <p className="text-sm">₹{part.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(part.id, quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(part.id, quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right min-w-20">
                        <p className="font-medium">₹{(part.price * quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => { setShowCart(false); setShowCheckout(true); }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Checkout Modal */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Order Summary</h4>
                {cart.map(({ part, quantity }) => (
                  <div key={part.id} className="flex justify-between text-sm">
                    <span>{part.name} x {quantity}</span>
                    <span>₹{(part.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Delivery Information</h4>
                <p className="text-sm text-muted-foreground">
                  Parts will be delivered to your registered address within the specified delivery timeframe.
                </p>
              </div>

              <Button className="w-full" onClick={handleCheckout}>
                <Check className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}