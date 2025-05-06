const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNo: Number,
  date: String,
  customer: {
    name: String,
    gstin: String,
    place: String,
  },
  items: [
    {
      id: String,
      name: String,
      mfgDate: String,
      expDate: String,
      qty: Number,
      mrp: String,
      discount: Number,
    },
  ],
  totalTaxableValue: Number,
  cgst: Number,
  sgst: Number,
  grandTotal: Number,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
