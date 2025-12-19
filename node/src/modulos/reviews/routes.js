const express = require("express");
const router = express.Router();
const reviewController = require("./controller");
const { authenticateToken } = require("../../middleware/auth");
const { validateCreateReview } = require("./validation");

// Rutas de reseñas
router.post(
  "/",
  authenticateToken,
  validateCreateReview,
  reviewController.createReview
);
router.get("/cancha/:canchaId", reviewController.getReviewsByCancha);
router.get(
  "/usuario/:usuarioId",
  authenticateToken,
  reviewController.getReviewsByUsuario
);
router.get(
  "/reserva/:reservaId",
  authenticateToken,
  reviewController.getReviewByReserva
);
router.put("/:id", authenticateToken, reviewController.updateReview);
router.delete("/:id", authenticateToken, reviewController.deleteReview);

module.exports = router;
