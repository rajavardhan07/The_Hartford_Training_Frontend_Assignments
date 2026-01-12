/* Problem Statement:
    Write a JavaScript program to manage purchase orders and invoices for training services. 
    The program should allow creating purchase orders with trainer details, training details, and payment information. 
    Generate invoices based on the purchase orders and track payment status.
*/

// Utility function to generate unique IDs(Generates random IDs like 'ABC123')
function generateId() {
  const letters = Math.random().toString(36).substring(2, 5).toUpperCase();
  const numbers = Math.floor(100 + Math.random() * 900);
  return letters + numbers;
}

//Add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//Payment Calculation
function calculateTotalAmount(payment) {
  switch (payment.type) {
    case "Hourly":
      return payment.rate * payment.duration; // hours

    case "Daily":
      return payment.rate * payment.duration; // days

    case "Monthly":
      return payment.rate * payment.duration; // months

    default:
      throw new Error("Unsupported payment type");
  }
}

// Purchase Order Creation
function createPurchaseOrder(trainer, training, payment) {
  let totalAmount = calculateTotalAmount(payment);
  return {
    poNumber: generateId(),

    trainerDetails: {
      name: trainer.name,
      email: trainer.email,
      experience: trainer.experience,
    },

    trainingDetails: {
      courseName: training.courseName,
      clientName: training.clientName,
      startDate: training.startDate,
      endDate: training.endDate,
    },

    paymentDetails: {
      type: payment.type,
      rate: payment.rate,
      duration: payment.duration,
      totalAmount: totalAmount,
    },
  };
}

// Invoice Generation
function generateInvoice(purchaseOrder) {
  const today = new Date();

  if (today < purchaseOrder.trainingDetails.endDate) {
    console.log("Training is still ongoing. Invoice cannot be generated yet.");
    return null;
  }

  const invoiceDate = today;
  const dueDate = addDays(invoiceDate, 30);

  return {
    invoiceNumber: generateId(),
    poReference: purchaseOrder.poNumber,
    trainerName: purchaseOrder.trainerDetails.name,
    courseName: purchaseOrder.trainingDetails.courseName,
    totalAmount: purchaseOrder.paymentDetails.totalAmount,
    invoiceDate: invoiceDate,
    dueDate: dueDate,
    paymentStatus: "UNPAID",
  };
}

//Overdue Check
function checkInvoiceStatus(invoice) {
  const today = new Date();

  if (invoice.paymentStatus === "Unpaid" && today > invoice.dueDate) {
    invoice.paymentStatus = "Overdue";
    notifyAccountsTeam(invoice);
  }
}

function notifyAccountsTeam(invoice) {
  console.log(`Invoice ${invoice.invoiceNumber} is OVERDUE`);
  console.log("Please follow up with the client.");
}

// Sample Data
const trainer = {
  name: "Sharat Kumar",
  email: "sharat@gmail.com",
  experience: "5 years",
};

const training = {
  courseName: "Java Full Stack Development",
  clientName: "ABC Corporation",
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-05-31"),
};

const payment = {
  type: "Monthly", // Hourly or Daily or Monthly
  rate: 100000, // per Month
  duration: 5, // Months
};

// Create Purchase Order
const purchaseOrder = createPurchaseOrder(trainer, training, payment);
console.log("Purchase Order Created:");
console.log(purchaseOrder);

// Generate Invoice (available only after training completion)
const invoice = generateInvoice(purchaseOrder);

if (invoice) {
  console.log("Invoice Generated:");
  console.log(invoice);
  //Check if invoice is overdue
  checkInvoiceStatus(invoice);
}
