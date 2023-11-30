const mongoose = require('mongoose');

const cvdPredictionSchema = mongoose.Schema({
  email:{
    type:String,
  },
  CVDScore: {
    type: Number,
  },
  generalHealth: {
    type: Number,
  },
  exercise: {
    type: Number,
  },
  heartDisease: {
    type: Number,
  },
  skinCancer: {
    type: Number,
  },
  otherCancer: {
    type: Number,
  },
  depression: {
    type: Number,
  },
  diabetes: {
    type: Number,
  },
  arthritis: {
    type: Number
  },
  sex: {
    type: Number
  },
  ageCategory: {
    type: String,
  },
  smokingHistory: {
    type: Number
  },
  checkup: {
    type: Number,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bmi: {
    type: Number,
  },
  alcoholConsumption: {
    type: Number,
  },
  fruitConsumption: {
    type: Number,
  },
  greenVegetablesConsumption: {
    type: Number,
  },
  friedPotatoConsumption: {
    type: Number,
  },
}, {
  timestamps: true,
});

const CvdPrediction = mongoose.model('CvdPrediction', cvdPredictionSchema);
module.exports = CvdPrediction;
