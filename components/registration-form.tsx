"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSavings, tierDetails } from "./savings-context"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  tier: z.enum(["1", "2", "3"], {
    required_error: "Please select a savings tier.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm({ onSuccess }: { onSuccess?: () => void }) {
  const { addStudent, availableSlots } = useSavings()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3 | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: FormValues) {
    try {
      if (availableSlots <= 0) {
        setError("No available slots. Please wait for a member to withdraw.")
        return
      }

      const tier = Number.parseInt(values.tier) as 1 | 2 | 3
      const amount = tierDetails[tier].amount
      const interestRate = tierDetails[tier].interestRate
      const weeklyInterest = amount * interestRate
      const totalWithdrawal = amount + weeklyInterest

      addStudent({
        name: values.name,
        tier,
        amount,
        interest: 0,
        totalWithdrawal: amount,
      })

      setSuccess(true)
      setError(null)
      form.reset()

      setTimeout(() => {
        setSuccess(false)
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (err) {
      setError((err as Error).message)
      setSuccess(false)
    }
  }

  const handleTierChange = (value: string) => {
    setSelectedTier(Number.parseInt(value) as 1 | 2 | 3)
    form.setValue("tier", value as "1" | "2" | "3")
  }

  const tierAmount = selectedTier ? tierDetails[selectedTier].amount : 0
  const interestRate = selectedTier ? tierDetails[selectedTier].interestRate : 0
  const weeklyInterest = tierAmount * interestRate
  const totalWithdrawal = tierAmount + weeklyInterest

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Join Savings Group</CardTitle>
          <CardDescription>
            Register to join our blockchain game investment group.
            {availableSlots > 0 ? (
              <span className="block mt-1 text-green-600 dark:text-green-400">
                {availableSlots} {availableSlots === 1 ? "slot" : "slots"} available
              </span>
            ) : (
              <span className="block mt-1 text-red-600 dark:text-red-400">No slots available</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Savings Tier</FormLabel>
                    <Select onValueChange={handleTierChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a savings tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Tier 1: ₦10,000 (5% weekly)</SelectItem>
                        <SelectItem value="2">Tier 2: ₦20,000 (10% weekly)</SelectItem>
                        <SelectItem value="3">Tier 3: ₦30,000 (20% weekly)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose your preferred savings tier.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={availableSlots <= 0}>
                Register
              </Button>
            </form>
          </Form>

          {success && (
            <Alert className="mt-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Success!</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                You have successfully joined the savings group.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mt-4 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-300">Error</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-400">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tier Information</CardTitle>
          <CardDescription>Preview your savings and returns based on selected tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Selected Tier</h3>
              <p className="text-3xl font-bold mt-2">{selectedTier ? `Tier ${selectedTier}` : "None selected"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">Initial Investment</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(tierAmount)}</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">Interest Rate</p>
                <p className="text-2xl font-bold mt-1">{interestRate * 100}%</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">Weekly Interest</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {formatCurrency(weeklyInterest)}
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">After 1 Week</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {formatCurrency(totalWithdrawal)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The group collectively invests in a Play-to-Earn blockchain game that yields a 20% return on the total
            invested amount per gameplay.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
