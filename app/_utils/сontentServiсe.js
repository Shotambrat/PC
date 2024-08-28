export async function fetchContentBySlug(slug) {
    const res = await fetch(`https://concept.uz/api/content/${slug}`);
    if (!res.ok) {
      throw new Error('Failed to fetch content');
    }
    const content = await res.json();
    return content;
  }
  
  export async function updateContentBySlug(slug, content) {
    const res = await fetch(`https://concept.uz/api/content/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
  
    if (!res.ok) {
      throw new Error('Failed to update content');
    }
  
    return await res.json();
  }
  