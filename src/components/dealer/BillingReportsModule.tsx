import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  BarChart3,
  Mail,
  Printer,
  Share
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  items: { description: string; quantity: number; rate: number; amount: number; }[];
}

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'financial' | 'operational';
  description: string;
  lastGenerated: string;
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
}

export function BillingReportsModule() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const { toast } = useToast();

  // Sample invoices data
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      invoiceNumber: "GRV-2024-001",
      date: "2024-01-15",
      dueDate: "2024-02-14",
      customerName: "Mumbai Industries",
      amount: 25000,
      tax: 4500,
      total: 29500,
      status: "paid",
      items: [
        { description: "Engine Oil Filter GT-45001", quantity: 50, rate: 400, amount: 20000 },
        { description: "Air Filter Assembly GT-45002", quantity: 10, rate: 500, amount: 5000 }
      ]
    },
    {
      id: "INV-002",
      invoiceNumber: "GRV-2024-002", 
      date: "2024-01-14",
      dueDate: "2024-02-13",
      customerName: "Delhi Infrastructure",
      amount: 45000,
      tax: 8100,
      total: 53100,
      status: "pending",
      items: [
        { description: "Hydraulic Pump GT-45003", quantity: 3, rate: 15000, amount: 45000 }
      ]
    },
    {
      id: "INV-003",
      invoiceNumber: "GRV-2024-003",
      date: "2024-01-10",
      dueDate: "2024-02-09",
      customerName: "Chennai Motors",
      amount: 18000,
      tax: 3240,
      total: 21240,
      status: "overdue",
      items: [
        { description: "Engine Gasket Set GT-45004", quantity: 9, rate: 2000, amount: 18000 }
      ]
    },
    {
      id: "INV-004",
      invoiceNumber: "GRV-2024-004",
      date: "2024-01-16",
      dueDate: "2024-02-15",
      customerName: "Bangalore Roads",
      amount: 32000,
      tax: 5760,
      total: 37760,
      status: "draft",
      items: [
        { description: "Electrical Components Kit", quantity: 8, rate: 4000, amount: 32000 }
      ]
    }
  ];

  // Sample reports data
  const reports: Report[] = [
    {
      id: "RPT-001",
      name: "Monthly Sales Report",
      type: "sales",
      description: "Comprehensive sales performance analysis",
      lastGenerated: "2024-01-15 10:30 AM",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "RPT-002",
      name: "Inventory Status Report",
      type: "inventory",
      description: "Current stock levels and movement analysis",
      lastGenerated: "2024-01-15 09:15 AM",
      size: "1.8 MB",
      format: "Excel"
    },
    {
      id: "RPT-003",
      name: "Financial Summary",
      type: "financial",
      description: "Revenue, expenses, and profit analysis",
      lastGenerated: "2024-01-14 05:45 PM",
      size: "3.2 MB",
      format: "PDF"
    },
    {
      id: "RPT-004",
      name: "Service Performance Report",
      type: "operational",
      description: "Service delivery metrics and KPIs",
      lastGenerated: "2024-01-14 02:20 PM",
      size: "1.5 MB",
      format: "CSV"
    },
    {
      id: "RPT-005",
      name: "Customer Analysis Report",
      type: "sales",
      description: "Customer segmentation and behavior analysis",
      lastGenerated: "2024-01-13 11:00 AM",
      size: "2.1 MB",
      format: "Excel"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'overdue': return 'bg-red-500 text-white';
      case 'draft': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return 'bg-blue-500 text-white';
      case 'inventory': return 'bg-green-500 text-white';
      case 'financial': return 'bg-purple-500 text-white';
      case 'operational': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleExport = (format: string, item?: any) => {
    const itemName = item ? item.name || item.invoiceNumber : 'data';
    toast({
      title: "Export Started",
      description: `${itemName} is being exported as ${format}`,
    });
  };

  const handleAction = (action: string, item: any) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed on ${item.id || item.invoiceNumber}`,
    });
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary stats
  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Billing & Reports</h2>
        <p className="text-muted-foreground">Manage invoices, billing, and generate comprehensive reports</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search invoices..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => handleExport("Excel")}>
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                      <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
                      <p className="text-2xl font-bold text-red-600">₹{overdueAmount.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>₹{invoice.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleAction('View', invoice)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleAction('Edit', invoice)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleExport('PDF', invoice)}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleAction('Email', invoice)}>
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="payment-terms">Default Payment Terms</Label>
                  <Select defaultValue="30-days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-days">15 Days</SelectItem>
                      <SelectItem value="30-days">30 Days</SelectItem>
                      <SelectItem value="45-days">45 Days</SelectItem>
                      <SelectItem value="60-days">60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="18" />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="INR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Save Billing Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Generate Quote
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Process Payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search reports..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="sales">Sales Reports</SelectItem>
                    <SelectItem value="inventory">Inventory Reports</SelectItem>
                    <SelectItem value="financial">Financial Reports</SelectItem>
                    <SelectItem value="operational">Operational Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{report.name}</h4>
                          <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                          <Badge variant="outline">{report.format}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Last Generated: {report.lastGenerated}</span>
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('View', report)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport('PDF', report)}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Share', report)}>
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Schedule', report)}>
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-bold text-green-600">₹{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Month</span>
                    <span className="font-bold">₹87,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Growth</span>
                    <span className="font-bold text-green-600">+15.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Paid Invoices</span>
                    <Badge className="bg-green-500 text-white">
                      {invoices.filter(inv => inv.status === 'paid').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending Invoices</span>
                    <Badge className="bg-yellow-500 text-white">
                      {invoices.filter(inv => inv.status === 'pending').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overdue Invoices</span>
                    <Badge className="bg-red-500 text-white">
                      {invoices.filter(inv => inv.status === 'overdue').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" onClick={() => handleExport('PDF')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={() => handleExport('Excel')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline" onClick={() => handleExport('CSV')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={() => handleAction('Email Report', {})}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}