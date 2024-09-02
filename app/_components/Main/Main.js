"use client"
import Banner from './Banner';
import Contacts from './Contacts';


export default function Main({ banners, contacts }) {

  return (
    <div className='w-full'>
      <h1>Main Component</h1>
      {banners ? <Banner banners={banners} /> : <p>No banners available</p>}
      {contacts ? <Contacts contacts={contacts} /> : <p>No content available</p>}
    </div>
  );
}