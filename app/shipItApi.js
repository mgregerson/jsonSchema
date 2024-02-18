"use strict";

const SHIPIT_SHIP_URL = "http://localhost:3001/ship";

const axios = require("axios");

/** Ship a single product through the shipit API.
 *
 * Returns shipId from shipit.
 */

async function shipProduct({ productId, customerName, address, zipCode, gift }) {
  return {
    shipped: true,
    shipmentId: 1273
  }
}

module.exports = { shipProduct };