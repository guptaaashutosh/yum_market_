const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'please enter heading']
  },
  description: {
    type: String,
    required: [true, 'please enter description']
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
        
      },
      url: {
        type: String,
        required: true
        
      }
    }
  ],
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports=mongoose.model("Slider",otherSchema);

