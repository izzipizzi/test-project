import { celebrate, Joi, Segments } from 'celebrate';
import { nicknameValidation, passwordValidation } from 'shared';

export const authValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      nickname: Joi.string().min(nicknameValidation.minLength).max(nicknameValidation.maxlength).required(),
      password: Joi.string()
        .regex(passwordValidation.passwordRegExp)
        .min(passwordValidation.minLength)
        .max(passwordValidation.maxlength)
        .required(),
    }),
  },
  { abortEarly: true }
);
