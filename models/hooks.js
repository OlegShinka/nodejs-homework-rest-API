//хук по додаванню необхідного статусу помилки замість дефольного статусу 500
export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

// new:true - оновлює і в базі, і в відповіді; runValidators:true - перевірка при оновленні також по монгуст схемі
export const addUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
