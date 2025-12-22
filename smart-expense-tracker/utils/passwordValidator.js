
export default function passwordValidator(password) {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!regex.test(password)) {
    return false;
  }

  return true;
}
