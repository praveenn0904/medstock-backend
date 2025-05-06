const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineModel'); // Adjust path as needed
const Invoice = require('../models/invoiceModel'); // Adjust path if needed

// Add new medicine
router.post('/add', async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    
    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully' });
  } catch (err) {
    console.error('Error adding medicine:', err);
    res.status(500).json({ error: 'Server error while adding medicine' });
  }
});

// Get all medicines
router.get('/all', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    console.error('Error fetching medicines:', err);
    res.status(500).json({ error: 'Server error while fetching medicines' });
  }
});

// Get medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ id: req.params.id });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    console.error('Error fetching medicine by custom ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update medicine by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedMedicine);
  } catch (err) {
    console.error('Error updating medicine:', err);
    res.status(500).json({ message: "Failed to update medicine" });
  }
});

// Delete medicine by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedMed = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMed) return res.status(404).json({ error: "Medicine not found" });
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (err) {
    console.error('Error deleting medicine:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: 'Invoice saved successfully' });
  } catch (err) {
    console.error('Error saving invoice:', err);
    res.status(500).json({ message: 'Server error saving invoice' });
  }
});

// Reduce stock for invoiced medicines
router.post('/reduce-stock', async (req, res) => {
  const { items } = req.body;

  try {
    // Loop over each item in the invoice to reduce the stock
    for (const item of items) {
      const med = await Medicine.findOne({ id: item.id }); // Find medicine by ID

      // If medicine is found
      if (med) {
        // Check if there is enough stock
        if (med.quantity < item.qty) {
          // If stock is insufficient, return an error response
          return res.status(400).json({
            message: `Insufficient stock for medicine: ${med.name} (ID: ${med.id}) - Available: ${med.quantity}, Requested: ${item.qty}`
          });
        }

        // Reduce the stock
        med.quantity -= item.qty;

        // Ensure quantity doesn't go negative
        if (med.quantity < 0) med.quantity = 0;

        // Save the updated medicine document
        await med.save();
      } else {
        // If medicine not found, return error
        return res.status(404).json({
          message: `Medicine with ID: ${item.id} not found`
        });
      }
    }

    // If all items are processed successfully, respond with success message
    res.status(200).json({ message: 'Stock updated successfully' });

  } catch (err) {
    console.error('Error reducing stock:', err);
    res.status(500).json({ message: 'Error updating stock' });
  }
});

module.exports = router;
