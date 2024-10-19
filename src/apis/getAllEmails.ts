export const getAllEmails = async () => {
  const response = await fetch(
    `https://flipkart-email-mock.now.sh`
  );
  const emails = await response.json();
  return emails;
};

export const getEmailById = async (id: string) => {
  const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
  const email = await response.json();
  return email;
};
