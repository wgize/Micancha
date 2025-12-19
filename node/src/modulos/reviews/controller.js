const reviewService = require("./service");

class ReviewController {
  async createReview(req, res) {
    try {
      const { canchaId, reservaId, comentario, calificacion } = req.body;
      const usuarioId = req.user.id;

      const review = await reviewService.createReview({
        usuarioId,
        canchaId,
        reservaId,
        comentario,
        calificacion,
      });

      res.status(201).json({
        success: true,
        message: "Reseña creada exitosamente",
        data: review,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al crear la reseña",
      });
    }
  }

  async getReviewsByCancha(req, res) {
    try {
      const { canchaId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const reviews = await reviewService.getReviewsByCancha(canchaId, {
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al obtener las reseñas",
      });
    }
  }

  async getReviewsByUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const usuarioSesion = req.user.id;

      // Solo el usuario puede ver sus propias reseñas o un admin
      if (
        usuarioSesion !== parseInt(usuarioId) &&
        req.user.tipo_usuario !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "No tienes permiso para ver estas reseñas",
        });
      }

      const reviews = await reviewService.getReviewsByUsuario(usuarioId);

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al obtener las reseñas",
      });
    }
  }

  async getReviewByReserva(req, res) {
    try {
      const { reservaId } = req.params;
      const usuarioId = req.user.id;

      const review = await reviewService.getReviewByReserva(
        reservaId,
        usuarioId
      );

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "No se encontró reseña para esta reserva",
        });
      }

      res.json({
        success: true,
        data: review,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al obtener la reseña",
      });
    }
  }

  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { comentario, calificacion } = req.body;
      const usuarioId = req.user.id;

      const review = await reviewService.updateReview(id, usuarioId, {
        comentario,
        calificacion,
      });

      res.json({
        success: true,
        message: "Reseña actualizada exitosamente",
        data: review,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al actualizar la reseña",
      });
    }
  }

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;

      await reviewService.deleteReview(id, usuarioId);

      res.json({
        success: true,
        message: "Reseña eliminada exitosamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error al eliminar la reseña",
      });
    }
  }
}

module.exports = new ReviewController();
