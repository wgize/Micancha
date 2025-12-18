module.exports = function (db) {
  const modelo = require("./modelo")(db);

  async function listarReservas(req, res) {
    const data = await modelo.reservasPorDueno(req.user.id);
    res.json({ error: false, body: data });
  }

  async function confirmar(req, res) {
    await modelo.confirmarReserva(req.params.id);
    res.json({ error: false, body: "Reserva confirmada" });
  }

  async function valorar(req, res) {
    const { comentario, valoracion } = req.body;

    await modelo.finalizarReserva(req.params.id, comentario, valoracion);

    res.json({ error: false, body: "Reserva valorada" });
  }

  return {
    listarReservas,
    confirmar,
    valorar,
  };
};
