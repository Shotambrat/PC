export default function Contacts() {
  return (
    <div className="w-full bg-white py-16">
      <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8">
        <h2 className="text-center text-main text-3xl font-semibold">
          Контакты
        </h2>
        <div className="grid xl:grid-cols-4 mdl:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-main text-3xl font-semibold">
                Premium Concept
              </h2>
              <a href="tel:+998712562903">+998 (71) 256-2903</a>
            </div>
            <p>Мирабадский район, ул. Фидокор (Чехова), 40</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-main text-3xl font-semibold">
                Premium Concept
              </h2>
              <a href="tel:+998712862075">+998 (71) 286-2075</a>
            </div>
            <p>Мирзо-Улугбекский район, ул. Саларбуйи, 47</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-main text-3xl font-semibold">
              New Concept
              </h2>
              <a href="tel:+998712481361">+998 (71) 248-1361</a>
            </div>
            <p>Олмазарский район, ул. Уста-Ширин, 124, магазин №15</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-main text-3xl font-semibold">
              Grohe Monobrand
              </h2>
              <a href="tel:+998993711115">+998 99 371 11 15</a>
            </div>
            <p>г. Ташкент, улица Алтынтепа, 166</p>
          </div>
        </div>
      </div>
    </div>
  );
}
