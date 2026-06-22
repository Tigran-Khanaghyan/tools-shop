import test, { expect } from '@playwright/test'

test.describe('API testing', () => {
  let token: string | null = null
  test('Login user', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: 'admin@gmail.com', password: 'admin1234' },
    })
    expect(response.status()).toBe(200)
    const data = JSON.parse(await response.text())
    if (data?.data?.token) {
      token = data?.data?.token
    }
  })
  //   test('Get user api', async ({ request }) => {
  //     if (!token) return
  //     const response = await request.get('api/auth/me', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     expect(response.status()).toBe(200)
  //   })
  //   test('Edit user api test', async ({ request }) => {
  //     const response = await request.put('api/auth/profile', {
  //       data: {
  //         name: 'admin',
  //         phone: '+37495363530',
  //         address: 'Berdavan 25',
  //       },
  //     })
  //   })
})
