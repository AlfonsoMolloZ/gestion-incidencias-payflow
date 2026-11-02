const { processPayment } = require("../config/database");

function chargeCustomer(orderId) {
  try {
    processPayment(orderId);
    return {
      statusCode: 200,
      message: `Pago de la orden ${orderId} procesado correctamente.`
    };
  } catch (error) {
    return {
      statusCode: 504,
      message: "Gateway Timeout: la pasarela de pagos no pudo obtener una conexión.",
      detail: error.message
    };
  }
}

module.exports = { chargeCustomer };
