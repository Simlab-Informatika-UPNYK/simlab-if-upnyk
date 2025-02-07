'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { LoginFormSchema } from '@/app/_lib/definitions'

export async function login(state, formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const validationResult = LoginFormSchema.safeParse(userData)
  
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      user: userData
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword(userData)

  if (error) {
    const isEmailError = error.message.toLowerCase().includes('email');
    const isPasswordError = error.message.toLowerCase().includes('password');
    return {
      errors: {
        email: isEmailError ? error.message : null,
        password: isPasswordError ? error.message : null,
        general: (!isEmailError && !isPasswordError) ? error.message : null
      },
      user: {
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
