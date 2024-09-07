import Joi from '@hapi/joi';

export const filteredimage = Joi.object({
  image_url: Joi.string().required().regex(/\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/)
});