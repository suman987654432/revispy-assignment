"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const FormSchema = z.object({
  interests: z.array(z.string()), // Remove min validation
})

// Add interface for interest type
interface Interest {
  id: string;
  label: string;
  description?: string;
}

const Interests = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [interests, setInterests] = useState<Interest[]>([]) // Add proper typing
  const [isFetching, setIsFetching] = useState(true)

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

  // Load categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetching(true)
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setInterests(data.categories ?? [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        toast.error("Failed to load categories")
      } finally {
        setIsFetching(false)
      }
    }

    fetchCategories()
  }, [])

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

  // Load saved interests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedInterests')
    if (saved) {
      const parsedInterests = JSON.parse(saved)
      setSelectedInterests(parsedInterests)
      form.setValue('interests', parsedInterests)
    }
  }, [])

  // Save to localStorage whenever selections change
  useEffect(() => {
    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests))
  }, [selectedInterests])

  if (isFetching) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="text-sm text-gray-600">Loading categories...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (interests.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-4xl">📦</div>
            <h3 className="text-lg font-medium">No categories found</h3>
            <p className="text-sm text-gray-600">Categories are being generated...</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg overflow-hidden">
      <CardHeader className="text-center space-y-4 bg-gray-50 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-900">Please mark your interests!</h2>
        <p className="text-sm text-gray-600">We will keep you notified.</p>
        {selectedInterests.length > 0 && (
          <div className="bg-blue-50 px-3 py-2 rounded-full">
            <span className="text-sm text-blue-700 font-medium">
              {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">My saved interests!</h3>
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="space-y-1">
                      {currentInterests.map((interest: Interest) => (
                        <FormItem
                          key={interest.id}
                          className="group flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                          <FormControl className="mt-1.5">
                            <Checkbox
                              checked={selectedInterests.includes(interest.id)}
                              onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                              className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                            />
                          </FormControl>
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => handleInterestChange(interest.id, !selectedInterests.includes(interest.id))}
                          >
                            <FormLabel className="font-medium text-gray-800 cursor-pointer block">
                              {interest.label}
                            </FormLabel>
                            {interest.description && (
                              <p className="text-xs text-gray-500 line-clamp-1  transition-all">
                                {interest.description}
                              </p>
                            )}
                          </div>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {hasChanges && (
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>SAVING...</span>
                    </div>
                  ) : (
                    "SAVE INTERESTS"
                  )}
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-0.5 text-sm text-gray-500 mt-6 pt-4 border-t mx-[-24px] px-6 bg-gray-50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="hover:bg-gray-100"
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
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {getPageNumbers().map((page) => (
                  <span
                    key={page}
                    className={`cursor-pointer px-2 py-1 rounded transition-colors ${currentPage === page
                        ? "bg-black text-white font-medium"
                        : "hover:bg-gray-100"
                      }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                ))}
                {totalPages > getPageNumbers()[getPageNumbers().length - 1] && (
                  <span className="text-gray-400">...</span>
                )}
                <Button
                  variant="ghost"
                  type="button"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Interests