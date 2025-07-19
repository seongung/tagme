"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, ArrowLeft, User, Instagram, QrCode, Share2, Heart, Sparkles, Camera } from "lucide-react"

interface ProfileData {
  name: string
  age: string
  instagram: string
  keywords: string[]
  intro: string
}

export default function Component() {
  const [step, setStep] = useState<"input" | "output">("input")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    instagram: "",
    keywords: "",
  })
  const [profile, setProfile] = useState<ProfileData | null>(null)

  const generateIntro = (name: string, keywords: string[]): string => {
    const templates = [
      `안녕하세요, ${name}입니다 ✨ 일상 속 작은 순간들을 소중히 여기며 살아가고 있어요`,
      `${name}이에요 🌸 새로운 사람들과의 만남을 통해 더 넓은 세상을 경험하고 싶어요`,
      `반가워요! ${name}입니다 🌟 진솔한 대화와 따뜻한 추억을 함께 만들어가요`,
      `${name}이라고 해요 💫 평범한 일상을 특별하게 만드는 작은 행복들을 찾아가는 중이에요`,
      `안녕하세요 ${name}입니다 🎀 서로의 이야기를 나누며 성장할 수 있는 관계를 꿈꿔요`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const generateQRData = (profile: ProfileData): string => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
NOTE:${profile.intro}
URL:https://instagram.com/${profile.instagram.replace("@", "")}
END:VCARD`
  }

  const handleCreateProfile = () => {
    if (!formData.name || !formData.age) return

    const keywordArray = formData.keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0)
      .map((k) => (k.startsWith("#") ? k : `#${k}`))

    const profileData: ProfileData = {
      name: formData.name,
      age: formData.age,
      instagram: formData.instagram,
      keywords: keywordArray,
      intro: generateIntro(formData.name, keywordArray),
    }

    setProfile(profileData)
    setStep("output")
  }

  const handleDownload = () => {
    if (!profile) return
    const element = document.createElement("a")
    const profileCard = document.getElementById("profile-card")

    // For demo purposes, download JSON data
    const file = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = `${profile.name}_dating_profile.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (step === "input") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-2">
              Profile Creator
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              나만의 특별한 데이팅 프로필을
              <br />
              만들어보세요
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  이름 *
                </Label>
                <Input
                  id="name"
                  placeholder="김지수"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 border-2 border-gray-100 focus:border-pink-300 focus:ring-pink-200 rounded-xl text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-800">
                  나이 *
                </Label>
                <Input
                  id="age"
                  placeholder="25"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-12 border-2 border-gray-100 focus:border-pink-300 focus:ring-pink-200 rounded-xl text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="instagram" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  인스타그램
                </Label>
                <Input
                  id="instagram"
                  placeholder="@your_handle"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="h-12 border-2 border-gray-100 focus:border-pink-300 focus:ring-pink-200 rounded-xl text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="keywords" className="text-sm font-semibold text-gray-800">
                  관심사 키워드
                </Label>
                <Input
                  id="keywords"
                  placeholder="여행, 요리, 영화감상, 반려동물"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="h-12 border-2 border-gray-100 focus:border-pink-300 focus:ring-pink-200 rounded-xl text-base font-medium"
                />
                <p className="text-xs text-gray-500 font-medium">쉼표(,)로 구분해서 입력해주세요</p>
              </div>

              <Button
                onClick={handleCreateProfile}
                disabled={!formData.name || !formData.age}
                className="w-full h-14 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                프로필 생성하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setStep("input")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-xl px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-xl"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card
          id="profile-card"
          className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-violet-50/30 backdrop-blur-sm"
        >
          <CardContent className="p-0">
            {/* Header with gradient */}
            <div className="h-32 bg-gradient-to-br from-pink-400 via-rose-400 to-violet-500 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8 -mt-16 relative z-10">
              {/* Avatar - Perfectly Centered */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 via-rose-300 to-violet-400 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-600" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute -top-2 -left-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md"
                  >
                    <Camera className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Name and Age */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile?.name}</h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl text-gray-600 font-semibold">{profile?.age}세</span>
                  {profile?.instagram && (
                    <>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-lg text-violet-600 font-medium">{profile.instagram}</span>
                    </>
                  )}
                </div>
              </div>

              <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* AI Generated Intro */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-pink-50 to-violet-50 rounded-2xl p-6 border border-pink-100">
                  <p className="text-gray-700 text-base leading-relaxed font-medium text-center">{profile?.intro}</p>
                </div>
              </div>

              {/* Hashtag Chips */}
              {profile?.keywords && profile.keywords.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">관심사</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profile.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-pink-100 to-violet-100 text-violet-700 hover:from-pink-200 hover:to-violet-200 px-4 py-2 text-sm font-semibold rounded-full border border-pink-200 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* QR Code Section */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <QrCode className="w-6 h-6 text-gray-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-800">QR 코드</h3>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="grid grid-cols-8 gap-1 w-24 h-24">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-gray-800" : "bg-white"} rounded-sm`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center font-medium">
                    QR 코드를 스캔하여 프로필 정보를 확인하세요
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  다운로드
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-4 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-xl font-semibold bg-transparent"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
