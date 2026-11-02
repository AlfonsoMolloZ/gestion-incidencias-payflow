const pool = {
  activeConnections: 0,
  maxConnections: 100
};

function processPayment(orderId) {
  try {
    if (pool.activeConnections >= pool.maxConnections) {
      throw new Error(
        "TimeoutException: Unable to acquire connection from pool"
      );
    }

    pool.activeConnections++;

    console.log(`Procesando pago de la orden ${orderId}...`);

  } finally {
    // SOLUCIÓN: Liberación de la conexión.
    if (pool.activeConnections > 0) {
      pool.activeConnections--;
    }
  }
}

module.exports = { processPayment, pool };