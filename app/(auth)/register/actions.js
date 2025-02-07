'use server'

import { createClient } from '@/utils/supabase/server'
import { SignupFormSchema } from '@/app/_lib/definitions'

export async function signup(state, formData) {
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  }

  const validationResult = SignupFormSchema.safeParse(userData)

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      user: userData
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  })

  if (error) {
    const isEmailError = error.message.toLowerCase().includes('email');
    const isPasswordError = error.message.toLowerCase().includes('password');
    return {
      errors: {
        email: isEmailError ? error.message : null,
        password: isPasswordError ? error.message : null,
        general: (!isEmailError && !isPasswordError) ? error.message : null
      },
      data: data,
      user: {
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }
    }
  }

  return { success: true }
}