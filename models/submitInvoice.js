const submitInvoice = async () => {
    const payload = {
      invoiceNo: "001", // ideally generated/incremented
      invoiceDate: new Date(),
      customerName,
      customerGST,
      placeOfSupply,
      items,
      taxableTotal: totalTaxableValue,
      taxAmount,
      grandTotal,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Invoice submitted successfully!");
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting invoice.");
    }
  };
  