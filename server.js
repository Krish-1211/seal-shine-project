
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

app.use(cors({
    origin: [FRONTEND_URL, 'https://seal-shine-frontend.onrender.com', 'http://localhost:8080'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

import { startShopifyOAuth, shopifyOAuthCallback } from "./backend/shopifyAuth.js";

const PORT = process.env.PORT || 3000;
const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID; // aligned naming
const SHOPIFY_API_SECRET = process.env.SHOPIFY_CLIENT_SECRET; // aligned naming
const SCOPES = 'read_products,write_products,read_inventory,write_inventory,read_locations,read_files,write_files';
// Assuming local dev for now
const HOST = 'http://localhost:3000';

// Minimal storage for the token
const TOKEN_PATH = path.join(__dirname, '.shopify_token');

// Register OAuth routes
// Register OAuth routes
app.get("/auth", startShopifyOAuth); // Standard route per requirements
app.get("/auth/shopify", startShopifyOAuth); // Legacy alias

// ... (keep auth callback wrapper) ...

// Root Health Check (Required: do not redirect)
app.get('/', (req, res) => {
    res.status(200).send("Seal Shine Backend is Running. OAuth endpoint: /auth?shop=YOUR_SHOP_DOMAIN");
});

// START
app.listen(PORT, () => {
    console.log(`Backend running on ${HOST}`);
    console.log(`Start OAuth flow: ${HOST}/auth/shopify?shop=suresealsealants.myshopify.com`);
    if (HOST.includes("localhost")) {
        console.log("⚠️  WARNING: Shopify Webhooks will NOT work on localhost unless you use ngrok.");
        console.log("👉  Run 'ngrok http 3000' and update your Webhook URL in Shopify Admin.");
    }
});
