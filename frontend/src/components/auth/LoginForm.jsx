// src/components/auth/LoginForm.jsx
import { useState } from "react";
import { VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import api from "../../services/api";
export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    usuario: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);

      // 👉 estructura correcta según tu backend
      const { token, usuario } = data.body;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      console.log("Token guardado:", token);
      console.log("Usuario:", usuario);

      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onSuccess?.();
      navigate("/");
    } catch (err) {
      toast({
        title: "Error al iniciar sesión",
        description: err.response?.data?.body || "Credenciales inválidas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
      <FormInput
        label="Usuario"
        name="usuario"
        value={form.usuario}
        onChange={handleChange}
        required
        placeholder="Usuario"
      />
      <FormInput
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        placeholder="Contraseña"
      />
      <FormButton type="submit">Iniciar sesión</FormButton>
    </VStack>
  );
}
