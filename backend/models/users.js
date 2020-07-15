let mongoose	=	require('mongoose'),
    Schema = mongoose.Schema;

let UsersSchema = new Schema({
  email:{type: String,required: true},
  password:{type: String,required: true},
  favProducts:[{ type: Schema.Types.ObjectId, ref: "product" }],
  cartProducts:[{ type: Schema.Types.ObjectId, ref: "product" }]
});

module.exports = mongoose.model('users', UsersSchema);
