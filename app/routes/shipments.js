"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");

const { shipProduct } = require("../shipItApi");
const shipmentSchema = require("../schemas/shipment.json");

/** POST /ship
 *
 * Validates and ships an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  console.log('errors=', req.body)
  const validator = jsonschema.validate(
    req.body, 
    orderSchema,
    {required: true}
);
  if (!validator.valid) {
    const msgs = validator.errors;
   
    throw new BadRequestError(msgs.map(err => err.stack));
  }

  const { productId, customerName, address, zipCode, gift } = req.body;
  const shipmentId = await shipProduct({ 
      productId, 
      customerName, 
      address,
      zipCode, 
      gift 
    });
  return res.json({ shipped: shipId, orderId: shipmentId });
});


module.exports = router;