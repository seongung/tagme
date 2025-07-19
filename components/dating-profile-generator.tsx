"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, ArrowLeft, User, MapPin, Briefcase, GraduationCap, Home, Heart, Camera, Loader2, ChevronLeft, MoreHorizontal, X, Share2, Sparkles, QrCode } from "lucide-react"
import { generateProfile, generateCardImage, ProfileData } from "@/lib/api"
import QRCode from "qrcode"
import { useToast } from "@/hooks/use-toast"
import { toPng } from 'html-to-image'

export default function DatingProfileGenerator() {
  const [step, setStep] = useState<"input" | "output">("input")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    instagram: "",
    mbti: "",
    keywords: "",
  })
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [profileId, setProfileId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<string>("")
  const { toast } = useToast()

  const handleCreateProfile = async () => {
    if (!formData.name || !formData.age) {
      toast({
        title: "필수 정보 누락",
        description: "이름과 나이는 필수 입력 항목입니다.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await generateProfile({
        name: formData.name,
        age: formData.age,
        instagram: formData.instagram,
        mbti: formData.mbti,
        keywords: formData.keywords,
      })

      if (response.success && response.profile && response.profileId) {
        setProfile(response.profile)
        setProfileId(response.profileId)
        
        // Generate QR code
        const profileUrl = `${window.location.origin}/profile/${response.profileId}`
        const qrData = await QRCode.toDataURL(profileUrl, {
          width: 256,
          margin: 2,
          color: {
            dark: '#333333',
            light: '#ffffff',
          },
        })
        setQrCodeData(qrData)
        
        setStep("output")
      } else {
        toast({
          title: "프로필 생성 실패",
          description: response.error || "프로필을 생성하는 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "서버와 통신 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!profile) return

    setIsLoading(true)
    try {
      const cardElement = document.getElementById('profile-card')
      if (!cardElement) {
        throw new Error('Profile card element not found')
      }

      // Generate PNG from the card element
      const dataUrl = await toPng(cardElement, {
        quality: 0.95,
        pixelRatio: 2, // 2x resolution for high quality
      })

      // Convert data URL to blob and download
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      
      const url = URL.createObjectURL(blob)
      const element = document.createElement("a")
      element.href = url
      element.download = `${profile.name}_dating_profile.png`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(url)
      
      toast({
        title: "다운로드 완료",
        description: "프로필 카드가 성공적으로 다운로드되었습니다.",
      })
    } catch (error) {
      console.error('Download error:', error)
      toast({
        title: "다운로드 실패",
        description: "이미지 생성 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (!profileId) return

    const profileUrl = `${window.location.origin}/profile/${profileId}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.name}님의 프로필`,
          text: '나의 소개팅 프로필을 확인해보세요!',
          url: profileUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(profileUrl)
      toast({
        title: "링크 복사됨",
        description: "프로필 링크가 클립보드에 복사되었습니다.",
      })
    }
  }

  if (step === "input") {
    return (
      <div className="min-h-screen bg-[#F7F7F7] relative overflow-hidden">
        {/* Bumble-style background */}
        <div className="absolute inset-0 bg-[#F7F7F7]"></div>

        <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
          {/* Bumble-style header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FFC629] rounded-3xl mb-4 shadow-lg">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="5"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              프로필 만들기
            </h1>
            <p className="text-gray-600 text-base">
              매력적인 프로필로 좋은 만남을 시작하세요
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  이름 <span className="text-[#FFC629]">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 border border-gray-300 focus:border-[#FFC629] focus:ring-2 focus:ring-[#FFC629]/20 rounded-lg text-base transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                  나이 <span className="text-[#FFC629]">*</span>
                </Label>
                <Input
                  id="age"
                  placeholder="나이를 입력하세요"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-12 border border-gray-300 focus:border-[#FFC629] focus:ring-2 focus:ring-[#FFC629]/20 rounded-lg text-base transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job" className="text-sm font-semibold text-gray-700">
                  직업
                </Label>
                <Input
                  id="job"
                  placeholder="예: 디자이너, 개발자, 마케터"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="h-12 border border-gray-300 focus:border-[#FFC629] focus:ring-2 focus:ring-[#FFC629]/20 rounded-lg text-base transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mbti" className="text-sm font-semibold text-gray-700">
                  MBTI
                </Label>
                <Input
                  id="mbti"
                  placeholder="예: ENFP, INTJ"
                  value={formData.mbti}
                  onChange={(e) => setFormData({ ...formData, mbti: e.target.value.toUpperCase() })}
                  maxLength={4}
                  className="h-12 border border-gray-300 focus:border-[#FFC629] focus:ring-2 focus:ring-[#FFC629]/20 rounded-lg text-base transition-all duration-200 hover:border-gray-400 uppercase tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-semibold text-gray-700">
                  관심사
                </Label>
                <Input
                  id="keywords"
                  placeholder="예: 여행, 요리, 영화, 운동"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="h-12 border border-gray-300 focus:border-[#FFC629] focus:ring-2 focus:ring-[#FFC629]/20 rounded-lg text-base transition-all duration-200 hover:border-gray-400"
                />
                <p className="text-xs text-gray-500">
                  쉼표로 구분해서 입력해주세요
                </p>
              </div>

              <Button
                onClick={handleCreateProfile}
                disabled={!formData.name || !formData.age || isLoading}
                className="w-full h-14 bg-[#FFC629] hover:bg-[#F5B800] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    프로필 생성 중...
                  </>
                ) : (
                  "프로필 만들기"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Bumble-style container */}
      <div className="container mx-auto px-4 py-6 max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setStep("input")}
            className="text-gray-700 hover:bg-gray-100 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <span className="font-semibold text-lg text-gray-900">프로필</span>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="text-gray-700 hover:bg-gray-100 rounded-full p-2"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        <Card
          id="profile-card"
          className="shadow-lg border-0 overflow-hidden bg-white rounded-2xl"
        >
          <CardContent className="p-0">
            {/* Profile Image Placeholder */}
            <div className="h-96 bg-gradient-to-b from-gray-100 to-gray-200 relative">
              {/* User Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/50 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
              </div>
              
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Name and Age overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold">{profile?.name}, {profile?.age}</h2>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-6">
              {/* Basic Info */}
              <div className="mb-4">
                {profile?.instagram && (
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-base">{profile.instagram}</span>
                  </div>
                )}
                {profile?.mbti && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-sm font-bold">MBTI</span>
                    </div>
                    <span className="text-base font-semibold">{profile.mbti}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* About Me Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">나에 대해</h3>
                <p className="text-gray-700 text-base leading-relaxed">{profile?.intro}</p>
              </div>

              {/* Interest Tags */}
              {profile?.keywords && profile.keywords.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">관심사</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 text-sm font-medium rounded-full border-0 transition-colors"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Looking for Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">이런 분을 찾아요</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#FFC629] text-white hover:bg-[#F5B800] px-4 py-2 text-sm font-medium rounded-full border-0">
                    진솔한 대화
                  </Badge>
                  <Badge className="bg-[#FFC629] text-white hover:bg-[#F5B800] px-4 py-2 text-sm font-medium rounded-full border-0">
                    함께 성장
                  </Badge>
                  <Badge className="bg-[#FFC629] text-white hover:bg-[#F5B800] px-4 py-2 text-sm font-medium rounded-full border-0">
                    긍정적인 에너지
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* QR Code Section */}
              <div className="mb-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 text-center">프로필 공유하기</h3>
                  <div className="flex justify-center mb-4">
                    {qrCodeData ? (
                      <img src={qrCodeData} alt="Profile QR Code" className="w-32 h-32 rounded-lg" />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    QR 코드로 프로필을 공유해보세요
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="flex-1 bg-[#FFC629] hover:bg-[#F5B800] text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      프로필 저장하기
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}