export type ProfileType = {
  id: string;
  active: 0 | 1;
  email: string;
  firstName: string;
  lastName: string;
  publicId: string;
  userType: 'System';
  username: string;
};

export type ResetPasswordFormValues = {
  email: string;
  password: string;
  resetPasswordToken: string;
};
