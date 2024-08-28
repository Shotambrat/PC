import { fetchContentBySlug } from '@/app/_utils/contentService';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const content = await fetchContentBySlug(slug);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: { content }, // передаем контент как пропсы
  };
}

export default function ContentPage({ content }) {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.text}</p>
    </div>
  );
}
