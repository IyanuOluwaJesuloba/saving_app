"use client"

import { useSavings } from "./savings-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, Calendar, Users, Wallet } from "lucide-react"

export function SavingsDashboard() {
  const { students, totalSavings, maxMembers, simulateWeek, weeksPassed } = useSavings()

  const totalInterest = students.reduce((sum, student) => sum + student.interest, 0)
  const totalWithdrawal = students.reduce((sum, student) => sum + student.totalWithdrawal, 0)
  const gameplayReturn = totalSavings * 0.2 // 20% return on total investment

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Savings</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalSavings)}</h3>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>From {students.length} members</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Interest</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalInterest)}</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                After {weeksPassed} {weeksPassed === 1 ? "week" : "weeks"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Gameplay Return</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(gameplayReturn)}</h3>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
              <span>20% of total investment</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Members</p>
                <h3 className="text-2xl font-bold mt-1">
                  {students.length}/{maxMembers}
                </h3>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-amber-600 dark:text-amber-400">
              <span>{maxMembers - students.length} slots available</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={simulateWeek} className="bg-green-600 hover:bg-green-700">
          Simulate Week
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members Breakdown</CardTitle>
          <CardDescription>Detailed view of each member's contribution and accumulated interest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Tier</th>
                  <th className="text-right py-3 px-4 font-medium">Investment</th>
                  <th className="text-right py-3 px-4 font-medium">Interest Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Accumulated Interest</th>
                  <th className="text-right py-3 px-4 font-medium">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500 dark:text-slate-400">
                      No members have joined yet
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">Tier {student.tier}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(student.amount)}</td>
                      <td className="py-3 px-4 text-right">
                        {student.tier === 1 ? "5%" : student.tier === 2 ? "10%" : "20%"}
                      </td>
                      <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">
                        {formatCurrency(student.interest)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">{formatCurrency(student.totalWithdrawal)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {students.length > 0 && (
                <tfoot>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <td colSpan={2} className="py-3 px-4 font-medium">
                      Total
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(totalSavings)}</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(totalInterest)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(totalWithdrawal)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
