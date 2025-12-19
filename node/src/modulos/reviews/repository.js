const mysql = require("../../DB/mysql"); // ✅ Usa tu conexión existente

class ReviewRepository {
  async createReview(reviewData) {
    try {
      const result = await mysql.agregar("reseñas", reviewData);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creando reseña: ${error.message}`);
    }
  }

  async getReviewById(reviewId) {
    try {
      const review = await mysql.uno("reseñas", reviewId);
      if (!review) return null;

      // Obtener datos del usuario
      const usuario = await mysql.uno("usuarios", review.usuario_id);
      return {
        ...review,
        usuario_nombre: usuario ? usuario.nombre : "Usuario",
        foto_perfil: usuario ? usuario.foto_perfil : null,
      };
    } catch (error) {
      throw new Error(`Error obteniendo reseña: ${error.message}`);
    }
  }

  async getReviewByReserva(reservaId) {
    try {
      const reviews = await mysql.queryRaw(
        `SELECT r.*, u.nombre as usuario_nombre, u.foto_perfil
         FROM reseñas r
         JOIN usuarios u ON r.usuario_id = u.id
         WHERE r.reserva_id = ?`,
        [reservaId]
      );
      return reviews[0] || null;
    } catch (error) {
      throw new Error(`Error obteniendo reseña por reserva: ${error.message}`);
    }
  }

  async getReviewsByCancha(canchaId, offset, limit) {
    try {
      const reviews = await mysql.queryRaw(
        `SELECT r.*, u.nombre as usuario_nombre, u.foto_perfil
         FROM reseñas r
         JOIN usuarios u ON r.usuario_id = u.id
         WHERE r.cancha_id = ?
         ORDER BY r.fecha DESC
         LIMIT ? OFFSET ?`,
        [canchaId, limit, offset]
      );
      return reviews;
    } catch (error) {
      throw new Error(`Error obteniendo reseñas por cancha: ${error.message}`);
    }
  }

  async getReviewsCountByCancha(canchaId) {
    try {
      const result = await mysql.queryRaw(
        "SELECT COUNT(*) as total FROM reseñas WHERE cancha_id = ?",
        [canchaId]
      );
      return result[0]?.total || 0;
    } catch (error) {
      throw new Error(`Error contando reseñas: ${error.message}`);
    }
  }

  async getReviewsByUsuario(usuarioId) {
    try {
      const reviews = await mysql.queryRaw(
        `SELECT r.*, c.nombre as cancha_nombre, c.direccion
         FROM reseñas r
         JOIN canchas c ON r.cancha_id = c.id
         WHERE r.usuario_id = ?
         ORDER BY r.fecha DESC`,
        [usuarioId]
      );
      return reviews;
    } catch (error) {
      throw new Error(`Error obteniendo reseñas por usuario: ${error.message}`);
    }
  }

  async updateReview(reviewId, updateData) {
    try {
      // Construir query dinámica
      const fields = Object.keys(updateData)
        .map((key) => `${key} = ?`)
        .join(", ");

      const values = Object.values(updateData);
      values.push(reviewId);

      await mysql.queryRaw(`UPDATE reseñas SET ${fields} WHERE id = ?`, values);
    } catch (error) {
      throw new Error(`Error actualizando reseña: ${error.message}`);
    }
  }

  async deleteReview(reviewId) {
    try {
      await mysql.eliminar("reseñas", reviewId);
    } catch (error) {
      throw new Error(`Error eliminando reseña: ${error.message}`);
    }
  }

  async hasUserReservationInCancha(usuarioId, canchaId) {
    try {
      const result = await mysql.queryRaw(
        `SELECT COUNT(*) as total
         FROM reservas r
         JOIN horarios h ON r.horario_id = h.id
         WHERE r.usuario_id = ? AND h.cancha_id = ? AND r.estado = 'finalizada'`,
        [usuarioId, canchaId]
      );
      return result[0]?.total > 0;
    } catch (error) {
      throw new Error(`Error verificando reservas: ${error.message}`);
    }
  }

  async getReservaById(reservaId) {
    try {
      const reserva = await mysql.uno("reservas", reservaId);
      return reserva;
    } catch (error) {
      throw new Error(`Error obteniendo reserva: ${error.message}`);
    }
  }

  async getCanchaAverageRating(canchaId) {
    try {
      const result = await mysql.queryRaw(
        "SELECT AVG(calificacion) as promedio FROM reseñas WHERE cancha_id = ?",
        [canchaId]
      );
      return result[0]?.promedio || 0;
    } catch (error) {
      throw new Error(`Error obteniendo promedio: ${error.message}`);
    }
  }
}

module.exports = new ReviewRepository();
