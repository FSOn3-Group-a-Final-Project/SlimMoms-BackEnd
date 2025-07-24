import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

     // Yeni eklenen alanlar --> calori heabının veri tabanında kaydeilmesi için
    dailyCalories: { type: Number, default: null },
    notAllowedProducts: { type: [String], default: [] }
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


export const UsersCollection = model('users', usersSchema);