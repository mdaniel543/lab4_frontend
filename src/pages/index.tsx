import { FormEvent, useEffect, useState } from "react";
import { api } from "@/services/api/api";
import ReactGA from "react-ga4";
/* ===== HeroUI components ===== */
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react"; // <-- o '@heroui/table'

/* ===== Modelo TS ===== */
interface User {
  id: number;
  nombre: string;
  email: string;
}

/* ===== Componente de página ===== */
export default function UsersPage() {
  /* estado de formulario y datos */
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------- API ---------- */
  const fetchUsers = async () => {
    try {
      const { data } = await api.get<User[]>("/usuarios");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const createUser = async () => {
    try {
      await api.post<User>("/usuarios", form);
      ReactGA.event({
        category: "User",
        action: "create",
        label: form.nombre,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  /* cargar una vez al montar */
  useEffect(() => {
    fetchUsers();
  }, []);

  /* submit del formulario */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      await createUser();
      setForm({ nombre: "", email: "" });
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    // Validación simple: nombre y email no deben estar vacíos
    return form.nombre.trim() !== "" && form.email.trim() !== "";
  }

  /* ---------- UI ---------- */
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Grupo 7</h1>
        <p className="text-gray-600">
          Laboratorio 4: Publicación de un Frontend UI/UX conectado a Backend en
          AWS - FrontEnd
        </p>
      </div>
      {/* ---------- Formulario ---------- */}
      <form
        onSubmit={handleSubmit}
        className="rounded-lg  shadow  space-y-6 p-4  dark:bg-gray-800 bg-white"
      >
        <h2 className="text-xl font-semibold">Nuevo usuario</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Nombre"
            value={form.nombre}
            isRequired
            onValueChange={(val) => setForm((f) => ({ ...f, nombre: val }))}
          />
          <Input
            type="email"
            label="Correo"
            value={form.email}
            isRequired
            onValueChange={(val) => setForm((f) => ({ ...f, email: val }))}
            validationBehavior="native"
          />
        </div>

        <Button type="submit" color="primary" isLoading={loading} className="">
          Crear
        </Button>
      </form>

      {/* ---------- Tabla ---------- */}
      <Table
        aria-label="Lista de usuarios"
        removeWrapper /* sin wrapper adicional */
        className="shadow rounded-lg"
        isStriped
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Correo</TableColumn>
        </TableHeader>

        <TableBody items={users} /* HeroUI optimiza render con items */>
          {(user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
