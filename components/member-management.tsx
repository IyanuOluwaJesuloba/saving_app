"use client"

import { useState } from "react"
import { useSavings, tierDetails } from "./savings-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, LogOut } from "lucide-react"
import { format } from "date-fns"

export function MemberManagement() {
  const { students, removeStudent, weeksPassed } = useSavings()
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<string | null>(null)

  const handleWithdraw = (id: string, name: string) => {
    removeStudent(id)
    setWithdrawalSuccess(name)

    setTimeout(() => {
      setWithdrawalSuccess(null)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Member Management</CardTitle>
          <CardDescription>Manage group members and process withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          {withdrawalSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg">
              <p className="text-green-800 dark:text-green-300">
                <span className="font-medium">{withdrawalSuccess}</span> has successfully withdrawn from the group.
              </p>
            </div>
          )}

          {students.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No members have joined the savings group yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => (
                <Card key={student.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{student.name}</h3>
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Tier {student.tier}
                        </span>
                      </div>

                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Investment</p>
                          <p className="font-medium">{formatCurrency(student.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Interest Earned</p>
                          <p className="font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(student.interest)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Total Value</p>
                          <p className="font-medium">{formatCurrency(student.totalWithdrawal)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Joined on {format(new Date(student.joinedAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full md:w-auto">
                            <LogOut className="h-4 w-4 mr-2" />
                            Withdraw
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to process withdrawal for {student.name}?
                              <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Initial Investment</p>
                                    <p className="font-medium">{formatCurrency(student.amount)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Interest Rate</p>
                                    <p className="font-medium">{tierDetails[student.tier].interestRate * 100}%</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Interest Earned</p>
                                    <p className="font-medium text-green-600 dark:text-green-400">
                                      {formatCurrency(student.interest)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Withdrawal</p>
                                    <p className="font-medium text-green-600 dark:text-green-400">
                                      {formatCurrency(student.totalWithdrawal)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleWithdraw(student.id, student.name)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Confirm Withdrawal
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Current progress of the savings group</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Week {weeksPassed}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Members</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Interest Earned</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(students.reduce((sum, student) => sum + student.interest, 0))}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Average Return</p>
                <p className="text-2xl font-bold">
                  {students.length > 0
                    ? `${(
                        (students.reduce((sum, student) => sum + student.interest, 0) /
                          students.reduce((sum, student) => sum + student.amount, 0)) *
                          100
                      ).toFixed(2)}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
