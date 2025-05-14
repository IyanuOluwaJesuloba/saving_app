"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationForm } from "@/components/registration-form"
import { SavingsDashboard } from "@/components/savings-dashboard"
import { MemberManagement } from "@/components/member-management"
import { SavingsProvider } from "@/components/savings-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState("register")

  return (
    <SavingsProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <header className="bg-white dark:bg-slate-950 shadow-sm">
          <div className="container mx-auto py-6 px-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blockchain Game Savings Group</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Invest together, earn together - 20% returns on gameplay
            </p>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="manage">Manage Members</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <RegistrationForm onSuccess={() => setActiveTab("dashboard")} />
            </TabsContent>
            <TabsContent value="dashboard">
              <SavingsDashboard />
            </TabsContent>
            <TabsContent value="manage">
              <MemberManagement />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 mt-12">
          <div className="container mx-auto text-center text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Blockchain Game Savings Group</p>
          </div>
        </footer>
      </div>
    </SavingsProvider>
  )
}
