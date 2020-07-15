let mongoose	=	require('mongoose'),
    Schema = mongoose.Schema;

let ProductSchema = new Schema({
  // id:{type: Number,required: true},
  title:{type: String,required: true},
  price:{type: Number,required: true},
  stock:{type: Number,required: true},
  isDeleted:{type: Boolean,default: false}
});

module.exports = mongoose.model('product', ProductSchema);
