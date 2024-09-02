// models/Banner.js
import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true }, // URL изображения
  buttonText: { type: String },
  buttonLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

export default Banner;


