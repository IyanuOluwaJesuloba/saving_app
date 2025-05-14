"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export interface Student {
  id: string
  name: string
  tier: 1 | 2 | 3
  amount: number
  interest: number
  totalWithdrawal: number
  joinedAt: Date
}

interface SavingsContextType {
  students: Student[]
  addStudent: (student: Omit<Student, "id" | "joinedAt">) => void
  removeStudent: (id: string) => void
  totalSavings: number
  maxMembers: number
  availableSlots: number
  simulateWeek: () => void
  weeksPassed: number
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined)

export const tierDetails = {
  1: { amount: 10000, interestRate: 0.05 },
  2: { amount: 20000, interestRate: 0.1 },
  3: { amount: 30000, interestRate: 0.2 },
}

export function SavingsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])
  const [weeksPassed, setWeeksPassed] = useState(0)
  const maxMembers = 12

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("savingsData")
    if (savedData) {
      const { students: savedStudents, weeksPassed: savedWeeks } = JSON.parse(savedData)
      setStudents(
        savedStudents.map((student: any) => ({
          ...student,
          joinedAt: new Date(student.joinedAt),
        })),
      )
      setWeeksPassed(savedWeeks)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savingsData", JSON.stringify({ students, weeksPassed }))
  }, [students, weeksPassed])

  const totalSavings = students.reduce((sum, student) => sum + student.amount, 0)
  const availableSlots = maxMembers - students.length

  const addStudent = (studentData: Omit<Student, "id" | "joinedAt">) => {
    if (students.length >= maxMembers) {
      throw new Error("Maximum number of members reached")
    }

    const newStudent: Student = {
      ...studentData,
      id: uuidv4(),
      joinedAt: new Date(),
    }

    setStudents([...students, newStudent])
  }

  const removeStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const simulateWeek = () => {
    setWeeksPassed((prev) => prev + 1)

    setStudents(
      students.map((student) => {
        const interestEarned = student.amount * tierDetails[student.tier].interestRate
        return {
          ...student,
          interest: student.interest + interestEarned,
          totalWithdrawal: student.amount + student.interest + interestEarned,
        }
      }),
    )
  }

  return (
    <SavingsContext.Provider
      value={{
        students,
        addStudent,
        removeStudent,
        totalSavings,
        maxMembers,
        availableSlots,
        simulateWeek,
        weeksPassed,
      }}
    >
      {children}
    </SavingsContext.Provider>
  )
}

export function useSavings() {
  const context = useContext(SavingsContext)
  if (context === undefined) {
    throw new Error("useSavings must be used within a SavingsProvider")
  }
  return context
}
