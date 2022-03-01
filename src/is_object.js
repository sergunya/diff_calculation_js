const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export default isObject;
