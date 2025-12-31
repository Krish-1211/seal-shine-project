
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Webhook, Save, Database, Server, Bell, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
    const [n8nWebhookUrl, setN8nWebhookUrl] = useState("https://n8n.your-domain.com/webhook/inventory-sync");
    const [slackWebhookUrl, setSlackWebhookUrl] = useState("");
    const [autoSync, setAutoSync] = useState(false);

    const handleSave = () => {
        // In a real app, this would save to a backend
        toast.success("Settings saved successfully", {
            description: "Integration configuration has been updated."
        });
    };

    const triggerManualSync = async () => {
        toast.info("Initiating Inventory Sync...", {
            description: "Sending request to n8n workflow..."
        });

        // Simulate API call
        setTimeout(() => {
            toast.success("Sync Command Sent", {
                description: "n8n has accepted the job. Check Slack for updates."
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your store integrations and automation preferences.
                    </p>
                </div>
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <Tabs defaultValue="integrations" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="developer">Developer</TabsTrigger>
                </TabsList>

                <TabsContent value="integrations" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Shopify Status</CardTitle>
                                <Database className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Connected</div>
                                <p className="text-xs text-muted-foreground">
                                    Storefront API: v2025-07
                                </p>
                                <div className="mt-4 flex items-center space-x-2 text-green-600 text-sm font-medium">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>Operational</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">n8n Automation</CardTitle>
                                <Webhook className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Ready</div>
                                <p className="text-xs text-muted-foreground">
                                    Workflow Controller
                                </p>
                                <div className="mt-4 flex items-center space-x-2 text-blue-600 text-sm font-medium">
                                    <Server className="h-4 w-4" />
                                    <span>Waiting for trigger</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Slack Alerts</CardTitle>
                                <Bell className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Pending</div>
                                <p className="text-xs text-muted-foreground">
                                    Notifications & Alerts
                                </p>
                                <div className="mt-4 flex items-center space-x-2 text-yellow-600 text-sm font-medium">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Configuration needed</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Automation (n8n)</CardTitle>
                                <CardDescription>
                                    Configure the connection to your n8n instance for automated inventory management across Shopify and Google Sheets.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="n8n-webhook">n8n Webhook URL (Production)</Label>
                                    <Input
                                        id="n8n-webhook"
                                        placeholder="https://n8n.your-domain.com/webhook/..."
                                        value={n8nWebhookUrl}
                                        onChange={(e) => setN8nWebhookUrl(e.target.value)}
                                    />
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        This webhook will be triggered when you initiate a manual sync or when specific order events occur.
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 rounded-md border p-4">
                                    <Webhook className="h-6 w-6" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Automatic Inventory Sync
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically push stock updates to Google Sheets every hour.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoSync}
                                        onCheckedChange={setAutoSync}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Last sync: Never</span>
                                    <Button variant="secondary" onClick={triggerManualSync}>
                                        <Server className="mr-2 h-4 w-4" />
                                        Trigger Manual Sync
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Required Credentials Guide</CardTitle>
                                <CardDescription>
                                    To fully activate the workflow, ensure these credentials are set in your n8n instance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="rounded-lg border p-3">
                                        <div className="flex items-center gap-2 font-medium mb-1">
                                            <Database className="h-4 w-4" /> Shopify Admin API
                                        </div>
                                        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                                            <li><strong>Scope:</strong> read_products, write_products, read_orders, read_inventory, write_inventory</li>
                                            <li><strong>Where to find:</strong> Shopify Partner Dashboard (Recommended) OR Store Settings &gt; Apps &gt; Develop Apps</li>
                                            <li><strong>Usage:</strong> n8n uses this to read orders and update stock levels.</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <div className="flex items-center gap-2 font-medium mb-1">
                                            <Server className="h-4 w-4" /> Google Cloud Service Account
                                        </div>
                                        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                                            <li><strong>Role:</strong> Editor (on the specific Spreadsheet)</li>
                                            <li><strong>Usage:</strong> Read/Write access to the Master Inventory Sheet.</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <div className="flex items-center gap-2 font-medium mb-1">
                                            <Bell className="h-4 w-4" /> Slack Bot Token
                                        </div>
                                        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                                            <li><strong>Scopes:</strong> chat:write, chat:write.public</li>
                                            <li><strong>Usage:</strong> Sending alerts for low stock and PO confirmations.</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Store Settings</CardTitle>
                            <CardDescription>
                                Basic configuration for your Seal Shine dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">General settings content placeholder</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
