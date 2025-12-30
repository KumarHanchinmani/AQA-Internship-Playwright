import { RegistrationData } from '../data-types/registration.interface';

export const createValidRegistrationData = (
  overrides?: Partial<RegistrationData>
): RegistrationData => {
  return {
    firstName: 'Kumar',
    lastName: 'Dew',
    birthDate: {
      day: 15,
      month: 'April',
      year: '1998',
    },
    email: `user_${Date.now()}@test.com`,
    password: 'qwerty@123',
    confirmPassword: 'qwerty@123',
    ...overrides,
  };
};
