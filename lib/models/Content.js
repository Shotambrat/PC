// models/Content.js
import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String },
  content: { type: String },
  seo: {
    title: String,
    description: String,
    keywords: String,
    icon: String,
    canonical: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
  },
  image: { type: String }, // URL изображения
  socialLinks: [
    {
      name: String,
      url: String,
      icon: String,
    }
  ],
  links: [
    {
      name: String,
      url: String,
    }
  ],
  updatedAt: { type: Date, default: Date.now },
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

export default Content;
