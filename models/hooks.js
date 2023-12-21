//хук по додаванню необхідного статусу помилки замість дефольного статусу 500
export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};
