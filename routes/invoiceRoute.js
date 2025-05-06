const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoiceModel'); // this should exist

// POST route to submit invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: 'Invoice saved successfully', invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving invoice', error: err.message });
  }
});

module.exports = router;
