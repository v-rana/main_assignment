const express = require('express');
const axios = require('axios');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

const mongoUri = "mongodb+srv://tempuser:YU94RGfVSSkfOndm@cluster0.m4ckkix.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


