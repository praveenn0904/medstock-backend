// backend/routes/dashboardRoute.js
const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineModel');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const medicines = await Medicine.find();

    const totalMedicines = medicines.length;
    const lowStock = medicines.filter(m => m.quantity <= 10).length;

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    const expiringSoon = medicines.filter(m => new Date(m.expiryDate) <= nextMonth).length;

    // Dummy data for orders and sales
    const orders = 25;
    const monthlySales = 10250;

    res.json({
      totalMedicines,
      lowStock,
      orders,
      monthlySales,
      expiringSoon
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
