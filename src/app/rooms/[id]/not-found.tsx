// app/rooms/[id]/not-found.tsx
export default function NotFound() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Cuarto no encontrado</h2>
      <p>Este cuarto no existe.</p>
      <a href="/rooms" className="underline">
        Volver a cuartos
      </a>
    </div>
  );
}
