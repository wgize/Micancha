const reviewRepository = require("./repository");
const { AppError } = require("../../utils/errors");

class ReviewService {
  async createReview({
    usuarioId,
    canchaId,
    reservaId,
    comentario,
    calificacion,
  }) {
    // Validaciones de negocio
    if (!canchaId) {
      throw new AppError("El ID de la cancha es requerido", 400);
    }

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      throw new AppError("La calificación debe estar entre 1 y 5", 400);
    }

    // Verificar si ya existe una reseña para esta reserva
    if (reservaId) {
      const existingReview = await reviewRepository.getReviewByReserva(
        reservaId
      );
      if (existingReview) {
        throw new AppError("Ya existe una reseña para esta reserva", 409);
      }

      // Verificar que la reserva pertenece al usuario y está finalizada
      const reserva = await reviewRepository.getReservaById(reservaId);
      if (!reserva) {
        throw new AppError("La reserva no existe", 404);
      }

      if (reserva.usuario_id !== usuarioId) {
        throw new AppError("No tienes permiso para reseñar esta reserva", 403);
      }

      if (reserva.estado !== "finalizada") {
        throw new AppError("Solo puedes reseñar reservas finalizadas", 400);
      }
    }

    // Verificar que el usuario haya tenido al menos una reserva en esta cancha
    const hasReservation = await reviewRepository.hasUserReservationInCancha(
      usuarioId,
      canchaId
    );
    if (!hasReservation && !reservaId) {
      throw new AppError(
        "Debes haber tenido una reserva en esta cancha para reseñarla",
        400
      );
    }

    // Crear la reseña
    const reviewData = {
      usuario_id: usuarioId,
      cancha_id: canchaId,
      reserva_id: reservaId || null,
      comentario: comentario || null,
      calificacion,
      fecha: new Date(),
    };

    const reviewId = await reviewRepository.createReview(reviewData);
    const review = await reviewRepository.getReviewById(reviewId);

    // Actualizar el promedio de calificación de la cancha
    await this.updateCanchaAverageRating(canchaId);

    return review;
  }

  async getReviewsByCancha(canchaId, { page, limit }) {
    const offset = (page - 1) * limit;

    const reviews = await reviewRepository.getReviewsByCancha(
      canchaId,
      offset,
      limit
    );
    const total = await reviewRepository.getReviewsCountByCancha(canchaId);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getReviewsByUsuario(usuarioId) {
    return await reviewRepository.getReviewsByUsuario(usuarioId);
  }

  async getReviewByReserva(reservaId, usuarioId) {
    const review = await reviewRepository.getReviewByReserva(reservaId);

    if (review && review.usuario_id !== usuarioId) {
      throw new AppError("No tienes permiso para ver esta reseña", 403);
    }

    return review;
  }

  async updateReview(reviewId, usuarioId, { comentario, calificacion }) {
    const review = await reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new AppError("Reseña no encontrada", 404);
    }

    if (review.usuario_id !== usuarioId) {
      throw new AppError("No tienes permiso para actualizar esta reseña", 403);
    }

    // Verificar que no haya pasado mucho tiempo (ejemplo: 30 días)
    const reviewDate = new Date(review.fecha);
    const now = new Date();
    const daysDiff = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

    if (daysDiff > 30) {
      throw new AppError("No puedes editar reseñas después de 30 días", 400);
    }

    const updateData = {};
    if (comentario !== undefined) updateData.comentario = comentario;
    if (calificacion !== undefined) updateData.calificacion = calificacion;

    await reviewRepository.updateReview(reviewId, updateData);

    // Actualizar el promedio de calificación de la cancha
    await this.updateCanchaAverageRating(review.cancha_id);

    return await reviewRepository.getReviewById(reviewId);
  }

  async deleteReview(reviewId, usuarioId) {
    const review = await reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new AppError("Reseña no encontrada", 404);
    }

    if (review.usuario_id !== usuarioId) {
      throw new AppError("No tienes permiso para eliminar esta reseña", 403);
    }

    const canchaId = review.cancha_id;

    await reviewRepository.deleteReview(reviewId);

    // Actualizar el promedio de calificación de la cancha
    await this.updateCanchaAverageRating(canchaId);
  }

  async updateCanchaAverageRating(canchaId) {
    const avgRating = await reviewRepository.getCanchaAverageRating(canchaId);

    // Aquí podrías actualizar un campo en la tabla canchas si lo deseas
    // await reviewRepository.updateCanchaRating(canchaId, avgRating);
  }
}

module.exports = new ReviewService();
