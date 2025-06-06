"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const interests = Array.from({ length: 100 }, (_, i) => ({
  id: `category-${i + 1}`,
  label: `Category ${i + 1}`,
}))

const FormSchema = z.object({
  interests: z.array(z.string()), // Remove min validation
})

const Interests = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  // Add selected interests state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interests: [], // Start with empty array
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast("Interests saved successfully!", {
        description: "We'll keep you notified about your selected interests.",
      })
      console.log({ data })
      setHasChanges(false) // Reset changes flag after successful save
    } catch (error) {
      console.error("Failed to save interests:", error)
      toast.error("Failed to save interests!")
    } finally {
      setIsLoading(false)
    }
  }

  // Update handleInterestChange to track changes
  const handleInterestChange = (interestId: string, checked: boolean) => {
    const newInterests = checked
      ? [...selectedInterests, interestId]
      : selectedInterests.filter((id) => id !== interestId)

    setSelectedInterests(newInterests)
    form.setValue("interests", newInterests)
    setHasChanges(true) // Set changes flag when user modifies selections
  }

  // Pagination calculations
  const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentInterests = interests.slice(startIndex, endIndex)

  // Page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxPages = 7 // Show max 7 page numbers
    const sidePages = Math.floor(maxPages / 2)

    let start = Math.max(1, currentPage - sidePages)
    const end = Math.min(totalPages, start + maxPages - 1)

    // Adjust start if we're near the end of the pages
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Please mark your interests!</h2>
        <p className="text-sm text-gray-600">We will keep you notified.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">My saved interests!</h3>
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="space-y-3">
                      {currentInterests.map((interest) => (
                        <FormItem key={interest.id} className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={selectedInterests.includes(interest.id)}
                              onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{interest.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {hasChanges && (
              <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                {isLoading ? "SAVING..." : "SAVE INTERESTS"}
              </Button>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {getPageNumbers().map((page) => (
                <span
                  key={page}
                  className={`cursor-pointer ${currentPage === page ? "font-medium text-black" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </span>
              ))}
              {totalPages > getPageNumbers()[getPageNumbers().length - 1] && <span>...</span>}
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Interests