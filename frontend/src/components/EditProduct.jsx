import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setFormData({
        name: res.data.name,
        price: res.data.price,
        category: res.data.category,
        stock: res.data.stock,
        description: res.data.description,
        image: null,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", Number(formData.price));
    data.append("category", formData.category);
    data.append("stock", Number(formData.stock));
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
