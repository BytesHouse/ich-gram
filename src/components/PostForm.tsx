"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ImageForm } from "./ImageForm";

const PostForm: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const token = Cookies.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      setError("Пожалуйста, введите текст поста.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post("/api/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Пост успешно создан!");
      setContent("");
      setImage(null);
      setError("");

      console.log("Пост создан:", response.data);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Не удалось создать пост. Попробуйте снова."
        );
      } else {
        setError("Неизвестная ошибка.");
      }
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Создание поста</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Текст поста</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <ImageForm setImage={setImage} />  {/* Передаем функцию setImage в компонент ImageForm */}

        <button type="submit" disabled={loading}>
          {loading ? "Публикуется..." : "Опубликовать пост"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default PostForm;
