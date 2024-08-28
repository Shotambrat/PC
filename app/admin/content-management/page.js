import TextEditor from "@/app/content-management/TextEditor";
import ImageCropEditor from "@/app/content-management/ImageCropEditor";
import SEOEditor from "@/app/content-management/SEOEditor";

export default function ContentManagementPage() {
  return (
    <div>
      <h1>Content Management</h1>
      <TextEditor slug="footer-text" initialContent="Initial footer text here" />
      <ImageCropEditor slug="main-banner" initialImage="initial-image-url-here" />
      <SEOEditor slug="home-page" />
    </div>
  );
}
