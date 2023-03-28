import { v1 as uuidv1 } from 'uuid';

const generateUUID = (): string => {
  try {
    return uuidv1();
  } catch (error) {
    console.log(error);
    return '';
  }
};

export { generateUUID };
