const mongoose = require("mongoose");

const InspectionSchema = mongoose.Schema({
  business_name: String,
  date: Date,
  result: String,
  city: String,
  sector: String,
  certification_number: Number,
  address: {
    city: String,
    zip: Number,
    street: String,
    number: Number,
  },
});

mongoose.model(
  process.env.INSPECTIONS_MODEL,
  InspectionSchema,
  process.env.DB_INSPECTIONS_MODEL
);
