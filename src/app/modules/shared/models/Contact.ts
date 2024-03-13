export interface Contact {
  email: string;
  phone_number: string;
  fullname: string;
  title: string;
  subject: string;
}

export interface ContactWithToken extends Contact{
  recaptcha_token?: string;
}
