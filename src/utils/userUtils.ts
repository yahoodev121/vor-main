import capitalize from 'capitalize';

export const getUserNameFromEmail = (email) => {
  if (!email) {
    return email;
  }
  const result = email.split('@');
  if (!result || !result.length) {
    return '';
  }
  return capitalize.words(result[0]);
};

export const getUserNameOrEmailPrefix = (user) => {
  if (!user || !(user instanceof Object)) {
    return null;
  }
  const fullName = [user.firstName, user.lastName]
    .join(' ')
    .trim();

  return capitalize.words(
    fullName === ''
      ? getUserNameFromEmail(user.email)
      : fullName,
  );
};
