import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Mobiles", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8RVfbq-eMMWrFj-aYtRfvFOjONP-BQ2UEzQ&s" },
  { id: 2, name: "Laptops", image: "https://cdn.mos.cms.futurecdn.net/xPYW4a73GxGBApFQeECW2h.jpg" },
  { id: 3, name: "Audio", image: "https://images.summitmedia-digital.com/spotph/images/2021/07/09/save-vs-splurge-audio-devices-640-1625825582.jpg" },
  { id: 4, name: "Accessories", image: "https://www.shutterstock.com/image-photo/smartphone-headphones-ebook-reader-other-260nw-1932016577.jpg" },
];

const Categories = () => {
  return (
    <section className="py-10 px-6">
      <h2 className="section-title">Shop by Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.name}`}   // ✅ yaha id ke jagah name bhejna h
            className="grid-item p-4 text-center block hover:scale-105 transition-transform duration-200"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-32 object-cover img-shadow rounded-lg"
            />
            <h3 className="mt-2 font-semibold">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
