const mongoose = require('mongoose');

// PSUDO SCHEMA
// .rooms >> array [{name, _id}]
// ._id (int)
// .name (str)
// .motto (str)
// .logo (img - over 16MB?)
// .primary_color (str - hex code)
// .secondary_color (str - hex code)
// .billing >> object
// {
// 	customer_id (str),
// 	default_source (str),
// 	source_last_4 (int),
// 	source_card_type. (str),
// 	source_expiry (int),
// 	subscription_id (str),
// 	payment_plan (str),
// }
  
  const Hotel = mongoose.model('Hotel', hotelSchema);
  
  module.exports = Hotel;
  