import ContentEditor from '@/app/admin/contentEditor/ContentEditor';

export default function ContentManagement({ content }) {
  return (
    <div>
      <h1>Управление контентом</h1>
      <ContentEditor apiEndpoint={`/api/content/${content.id}`} initialValues={content} />
    </div>
  );
}