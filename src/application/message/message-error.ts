import { IMessageError } from 'src/infrastructure/filters/exceptionError';

const messageErrorCartNotFound: IMessageError = {
  resultCode: 1,
  description: 'No existe el carrito',
  code: 'cart_not_found',
};

const messageErrorProductNotFound: IMessageError = {
  resultCode: 1,
  description: 'No existe este product',
  code: 'product_not_found',
};

const messageError = {
  messageErrorCartNotFound,
  messageErrorProductNotFound,
};

export default messageError;
