"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setLoading(false)

    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our latest entertainment news in your inbox.",
    })
  }

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">You're all set!</h3>
          <p className="text-green-700 text-sm">
            Thanks for subscribing to Haluland. Check your inbox for a confirmation email.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-purple-900 mb-2">Stay in the Loop</h3>
          <p className="text-purple-700 text-sm">
            Get the latest music and movie news delivered straight to your inbox. No spam, just the good stuff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white border-purple-200 focus:border-purple-400"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>

        <p className="text-xs text-purple-600 text-center mt-3">
          By subscribing, you agree to our privacy policy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  )
}
