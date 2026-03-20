// MVP-only: This function is designed to be swapped for a real API call (Node.js/Firebase) later.
// To replace: update this function to call your auth endpoint with the same { email, password } signature.

const MOCK_USERS = [
  { email: 'user@example.com', password: 'password123' },
];

export async function mockAuthHandler({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const match = MOCK_USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (match) {
    return { success: true };
  }

  return {
    success: false,
    error: "We couldn't find that email and password. Please try again.",
  };
}
