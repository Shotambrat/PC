export default function Contacts({ contacts }) {
  return (
    <div className="w-full bg-white py-16">
      <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8">
        <h2 className="text-center text-main text-3xl font-semibold">
          {contacts?.title || "Контакты"}
        </h2>
        <div className="grid xl:grid-cols-4 mdl:grid-cols-2 gap-4">
          {contacts?.locations?.map((location, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-main text-3xl font-semibold">
                  {location.name}
                </h2>
                <a href={`tel:${location.phone}`}>{location.phone}</a>
              </div>
              <p>{location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
