#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigProvider_1 = __importDefault(require("../src/config/ConfigProvider"));
const src_1 = __importDefault(require("../src"));
const bot = new src_1.default(new ConfigProvider_1.default());
bot.connect().then(() => console.log('Bot is now connected to Discord. Check your server!'));
