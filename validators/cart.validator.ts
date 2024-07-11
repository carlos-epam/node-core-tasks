import Joi from 'joi';

const updateCartSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  count: Joi.number().integer().min(0).required()
});

export const validateUpdateCart = (data: any) => {
  return updateCartSchema.validate(data);
};