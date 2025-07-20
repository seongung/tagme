'use client'

import { useEffect, useState } from 'react'

export const runtime = 'edge'
import { useParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Instagram, Heart, Loader2 } from "lucide-react"
import { getProfile, ProfileData } from '@/lib/api'
import { ProfileAvatar } from "@/components/profile-avatar"

export default function ProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (params.id && typeof params.id === 'string') {
        try {
          const data = await getProfile(params.id)
          if (data) {
            setProfile(data)
          } else {
            setError(true)
          }
        } catch (err) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProfile()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">프로필을 찾을 수 없습니다</h1>
          <a href="/" className="text-violet-600 hover:text-violet-700">
            새 프로필 만들기 →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-600 rounded-xl mb-3 shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{profile.name}님의 프로필</h1>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-violet-50/30 backdrop-blur-sm">
          <CardContent className="p-0">
            {/* Header with gradient */}
            <div className="h-32 bg-gradient-to-br from-pink-400 via-rose-400 to-violet-500 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8 -mt-16 relative z-10">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 via-rose-300 to-violet-400 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <ProfileAvatar
                        name={profile.name}
                        age={profile.age}
                        mbti={profile.keywords.find(k => 
                          ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                           'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
                          .includes(k.replace('#', '').toUpperCase())
                        )?.replace('#', '')}
                        keywords={profile.keywords}
                        size={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name and Age */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl text-gray-600 font-semibold">{profile.age}세</span>
                  {profile.instagram && (
                    <>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-lg text-violet-600 font-medium flex items-center gap-1">
                        <Instagram className="w-4 h-4" />
                        {profile.instagram}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* AI Generated Intro */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-pink-50 to-violet-50 rounded-2xl p-6 border border-pink-100">
                  <p className="text-gray-700 text-base leading-relaxed font-medium text-center">{profile.intro}</p>
                </div>
              </div>

              {/* Hashtag Chips */}
              {profile.keywords && profile.keywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">관심사</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profile.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-pink-100 to-violet-100 text-violet-700 px-4 py-2 text-sm font-semibold rounded-full border border-pink-200 shadow-sm"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            나만의 프로필을 만들고 싶으신가요?
          </p>
          <a
            href="/"
            className="inline-block mt-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
          >
            프로필 만들기 →
          </a>
        </div>
      </div>
    </div>
  )
}