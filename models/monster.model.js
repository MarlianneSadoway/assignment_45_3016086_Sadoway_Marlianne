import mongoose from "mongoose";

const MonsterSchema = new mongoose.Schema(
  { 
    id: { type: Number, unique: true, required: true }, 
    name: { type: String, required: true },
    username: { type: String, required: false },
    email: { type: String, required: false },
    address: {
      street: { type: String, required: false },
      suite: { type: String, required: false },
      city: { type: String, required: false },
      zipcode: { type: String, required: false },
      geo: {
        lat: { type: String, required: false },
        lng: { type: String, required: false },
      },
    },
    phone: { type: String, required: false },
    website: { type: String, required: false },
    company: {
      name: { type: String, required: false },
      catchPhrase: { type: String, required: false },
      bs: { type: String, required: false },
    },
    image_url: { type: String, required: true },
  },
  { timestamps: true, strictQuery: true }
);

const Monster = mongoose.model("Monster", MonsterSchema);

export default Monster;
