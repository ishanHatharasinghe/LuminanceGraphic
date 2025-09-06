// supabase.js - Fixed for Vite/React environment
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dayfnvkupbgxtcfvuych.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRheWZudmt1cGJneHRjZnZ1eWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNzk4MzcsImV4cCI6MjA3Mjc1NTgzN30.za8TdqHZsY5yl9sYWrJ_bznqTdeJLVlvi5Usxj27ap8'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Function to backup testimonial to Supabase
export const backupTestimonialToSupabase = async (testimonialData) => {
  try {
    // Transform Firebase data to Supabase format
    const supabaseData = {
      name: testimonialData.name,
      email: testimonialData.email,
      occupation: testimonialData.occupation,
      company: testimonialData.company,
      rating: testimonialData.rating,
      comment: testimonialData.comment,
      date_and_time: testimonialData.dateAndTime,
      profile_picture_url: testimonialData.profilePictureUrl,
      user_id: testimonialData.userId,
      user_display_name: testimonialData.userDisplayName,
      user_photo_url: testimonialData.userPhotoURL,
      firebase_id: testimonialData.firebaseId || null // Store Firebase ID if available
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([supabaseData])
      .select()

    if (error) {
      console.error('Error backing up to Supabase:', error)
      return { success: false, error }
    }

    console.log('Successfully backed up to Supabase:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error backing up to Supabase:', error)
    return { success: false, error }
  }
}