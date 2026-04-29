// hooks/use-role.ts
'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export type UserRole = 'ADMIN' | 'USER'

export function useRole() {
  const [role, setRole] = useState<UserRole>('USER')
  const user = useSelector((state: any) => state?.auth?.user)

  useEffect(() => {
    if (user?.role === 'ADMIN' || user?.role === 'USER') {
      setRole(user.role)
    }
  }, [user])

  return role
}