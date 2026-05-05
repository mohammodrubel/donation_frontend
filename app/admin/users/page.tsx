'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MoreVertical, Mail, Loader2 } from 'lucide-react'
import { useGetUsersQuery, useDeleteUserMutation } from '@/lib/reudx/fetchers/user/userApi'
import { PaginationBar } from '@/components/share/PaginationBar'

export default function AdminUsersPage() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const { data, isLoading } = useGetUsersQuery({ page, limit, search })
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const users = data?.data || []
  const meta = data?.meta

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      await deleteUser(id).unwrap()
    } catch {
      alert('Delete failed')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage and verify user accounts</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, phone…"
              className="pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {meta && (
            <div className="text-sm text-muted-foreground ml-auto">
              {meta.total} total
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    {search ? `No matches for "${search}".` : 'No users found.'}
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-foreground">{user.name}</p>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{user.email}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{user.phone || '—'}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{user.role}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                          className="text-primary hover:bg-primary/10"
                        >
                          <a href={`mailto:${user.email}`}>
                            <Mail className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta && (
          <div className="mt-4">
            <PaginationBar
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
