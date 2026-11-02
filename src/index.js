const { chargeCustomer } = require("./services/paymentGatewayService");

const orderId = 98421;

console.log("=== PayFlow TIC | Simulación de pasarela de pagos ===");
console.log(`Procesando orden #${orderId}...`);

const result = chargeCustomer(orderId);

console.log(`HTTP ${result.statusCode}`);
console.log(result.message);

if (result.detail) {
  console.error(`[ERROR] ${result.detail}`);
}
