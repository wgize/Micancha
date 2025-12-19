const { body, param, validationResult } = require("express-validator");

const validateCreateReview = [
  body("canchaId")
    .isInt({ min: 1 })
    .withMessage("El ID de la cancha debe ser un número entero positivo"),

  body("reservaId")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("El ID de la reserva debe ser un número entero positivo"),

  body("comentario")
    .optional({ nullable: true })
    .isString()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("El comentario debe tener entre 10 y 500 caracteres"),

  body("calificacion")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe estar entre 1 y 5"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateUpdateReview = [
  body("comentario")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("El comentario debe tener entre 10 y 500 caracteres"),

  body("calificacion")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe estar entre 1 y 5"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateParamId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateCreateReview,
  validateUpdateReview,
  validateParamId,
};
