export const regexValidator = (
  regex: RegExp,
  value: string,
  setter: (arg0: string) => void
) => {
  const regexCheck = regex.test(value);
  console.log(regexCheck);
  if (value.length === 0) setter('');
  if (regexCheck) {
    setter(value);
  }
};
