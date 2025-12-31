
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());

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
app.get("/auth/shopify", startShopifyOAuth);
app.get("/auth/callback", shopifyOAuthCallback);

// START
app.listen(PORT, () => {
    console.log(`Backend running on ${HOST}`);
    console.log(`Start OAuth flow: ${HOST}/auth/shopify?shop=suresealsealants-2.myshopify.com`);
});
