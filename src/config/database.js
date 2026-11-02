// SIMULACIÓN DEL PROBLEMA INICIAL (intencionalmente defectuoso).
// Representa un pool de conexiones saturado y una conexión que no se libera.

const pool = {
  activeConnections: 50,
  maxConnections: 50
};

function processPayment(orderId) {
  if (pool.activeConnections >= pool.maxConnections) {
    throw new Error(
      "TimeoutException: Unable to acquire connection from pool after 30000ms"
    );
  }

  pool.activeConnections++;

  // BUG INTENCIONAL: no se libera la conexión al finalizar el proceso.
  console.log(`Conexión adquirida para la orden ${orderId}.`);
}

module.exports = { processPayment, pool };
