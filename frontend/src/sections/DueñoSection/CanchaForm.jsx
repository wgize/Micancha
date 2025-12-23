import { useState } from "react";
import {
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  HStack,
  Checkbox,
  Text,
  useToast,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import InfoCard from "../../components/ui/InfoCard";

const SERVICIOS = ["Estacionamiento", "Vestuario", "Duchas", "Bar", "Kiosco"];
const SUPERFICIES = ["Césped sintético", "Césped natural", "Parquet"];

export default function CanchaForm() {
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    surface: "",
    services: [],
    description: "",
  });

  const [file, setFile] = useState(null);

  // 📸 manejar archivo
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleCheck = (serv) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(serv)
        ? f.services.filter((s) => s !== serv)
        : [...f.services, serv],
    }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        throw new Error("Debes iniciar sesión como dueño");
      }

      // 🧠 FormData
      const formData = new FormData();
      formData.append("nombre", form.name);
      formData.append("direccion", form.location);
      formData.append("precio_por_hora", Number(form.price));
      formData.append("superficie", form.surface);
      formData.append("servicios_adicionales", JSON.stringify(form.services));
      formData.append("descripcion", form.description);
      formData.append("dueño_id", user.id);
      formData.append("lat", "");
      formData.append("lng", "");

      // 📸 imagen
      if (file) {
        formData.append("foto", file);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/canchas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ NO Content-Type
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar cancha");
      }

      toast({
        title: "Cancha registrada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // 🔄 reset
      setForm({
        name: "",
        location: "",
        price: "",
        surface: "",
        services: [],
        description: "",
      });
      setFile(null);
    } catch (e) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <InfoCard title="Registrar nueva cancha">
      <VStack
        spacing={4}
        align="stretch"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          placeholder="Nombre de la cancha"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <Input
          placeholder="Dirección"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <FormControl>
          <FormLabel>Foto de la cancha (opcional)</FormLabel>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </FormControl>

        <InputGroup>
          <InputLeftAddon>S/.</InputLeftAddon>
          <Input
            type="number"
            placeholder="Precio por hora"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </InputGroup>

        <Select
          placeholder="Tipo de superficie"
          value={form.surface}
          onChange={(e) => setForm({ ...form, surface: e.target.value })}
          required
        >
          {SUPERFICIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <Text fontWeight="bold">Servicios</Text>
        <HStack spacing={4} wrap="wrap">
          {SERVICIOS.map((s) => (
            <Checkbox
              key={s}
              isChecked={form.services.includes(s)}
              onChange={() => handleCheck(s)}
            >
              {s}
            </Checkbox>
          ))}
        </HStack>

        <Textarea
          placeholder="Descripción (opcional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Button colorScheme="teal" type="submit" size="lg">
          Registrar cancha
        </Button>
      </VStack>
    </InfoCard>
  );
}
