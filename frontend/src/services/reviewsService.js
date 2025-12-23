import api from "./api";

const reviewsService = {
  // Crear nueva reseña
  createReview: async (reviewData) => {
    try {
      const response = await api.post("/reviews", {
        cancha_id: reviewData.canchaId,
        reserva_id: reviewData.reservaId || null,
        comentario: reviewData.comment,
        calificacion: reviewData.rating,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear la reseña"
      );
    }
  },

  // Obtener reseñas por cancha
  getReviewsByCancha: async (canchaId) => {
    try {
      const response = await api.get(`/reviews/cancha/${canchaId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener reseñas"
      );
    }
  },

  // Obtener reseñas por usuario
  getReviewsByUser: async (userId) => {
    try {
      const response = await api.get(`/reviews/usuario/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener reseñas del usuario"
      );
    }
  },

  // Verificar si usuario puede dejar reseña
  canUserReview: async (canchaId) => {
    try {
      const response = await api.get(`/reviews/can-review/${canchaId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al verificar permisos"
      );
    }
  },

  // Actualizar reseña
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar la reseña"
      );
    }
  },

  // Eliminar reseña
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar la reseña"
      );
    }
  },
};

export default reviewsService;
