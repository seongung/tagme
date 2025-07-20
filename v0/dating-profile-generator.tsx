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
    // Extract MBTI type from keywords if present
    const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                       'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
    const mbtiKeyword = keywords.find(k => mbtiTypes.includes(k.replace('#', '').toUpperCase()))
    const mbtiType = mbtiKeyword ? mbtiKeyword.replace('#', '').toUpperCase() : null
    
    // Extract other keywords for personalization
    const otherKeywords = keywords.filter(k => !mbtiTypes.includes(k.replace('#', '').toUpperCase()))
    
    // MBTI-specific templates
    const mbtiTemplates: { [key: string]: string[] } = {
      'ENFP': [
        `안녕하세요, ${name}입니다 ✨ ENFP 특유의 밝은 에너지로 주변을 환하게 만드는 걸 좋아해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}${otherKeywords.length > 1 ? `와 ${otherKeywords[1].replace('#', '')}` : ''}를 통해 새로운 영감을 얻고,` : '새로운 경험을 통해 영감을 얻고,'} 그 순간들을 특별하게 만들어가는 중이에요. 함께 있으면 자연스럽게 웃음이 나오는, 그런 따뜻한 관계를 만들어가고 싶어요 🌸`,
        `${name}이에요 💫 호기심 많은 ENFP답게 매일이 새로운 모험이죠! ${otherKeywords.length > 0 ? `특히 ${otherKeywords[0].replace('#', '')}에 푹 빠져있고,` : '다양한 취미를 즐기며'} 열정적으로 살아가고 있어요. 깊이 있는 대화와 진정성 있는 연결을 중요하게 생각하며, 서로의 꿈을 응원하는 관계를 꿈꿔요 🌟`
      ],
      'INFP': [
        `반가워요, ${name}입니다 🌙 INFP의 섬세한 감성으로 세상을 바라보며 살아가고 있어요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 좋아하고,` : '조용한 시간을 즐기며'} 마음 깊은 곳의 이야기들을 나눌 수 있는 사람을 찾고 있어요. 서로의 내면을 이해하고 공감하며, 함께 성장할 수 있는 특별한 인연을 기다려요 💝`,
        `${name}이라고 해요 🌸 이상주의적인 INFP답게 진정성 있는 관계를 추구해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}${otherKeywords.length > 1 ? `이나 ${otherKeywords[1].replace('#', '')}` : ''}를 통해` : '일상 속에서'} 작은 의미들을 발견하고, 그 순간들을 소중히 여기죠. 따뜻한 마음으로 서로를 이해하고 지지해줄 수 있는 관계를 만들어가고 싶어요 ✨`
      ],
      'ENTP': [
        `안녕하세요! ${name}입니다 🚀 ENTP 특유의 창의적 사고로 매일을 흥미롭게 만들어가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 대한 열정이 넘치고,` : '새로운 아이디어를 탐구하는 걸 좋아하고,'} 지적인 대화를 즐기는 편이에요. 함께 성장하고 서로에게 영감을 주는, 역동적인 관계를 추구해요 💡`,
        `${name}이에요 ⚡ 호기심 많은 ENTP답게 끊임없이 새로운 것을 배우고 도전해요. ${otherKeywords.length > 0 ? `요즘은 ${otherKeywords[0].replace('#', '')}에 빠져있고,` : '다양한 분야에 관심이 많고,'} 열린 마음으로 세상을 탐험하죠. 서로의 관점을 존중하며 함께 토론하고 웃을 수 있는 파트너를 찾고 있어요 🌟`
      ],
      'INTJ': [
        `${name}입니다 🎯 전략적인 INTJ답게 목표를 향해 꾸준히 나아가고 있어요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 자기계발을 하며,` : '지속적인 성장을 추구하며,'} 깊이 있는 관계를 중요하게 생각해요. 서로의 독립성을 존중하면서도 함께 발전할 수 있는 성숙한 관계를 원해요 💎`,
        `안녕하세요, ${name}이에요 🌌 독립적인 INTJ지만 의미 있는 연결을 소중히 여겨요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 대한 전문성을 쌓아가며,` : '자신만의 분야를 개척하며,'} 삶의 질을 높이는 데 집중하고 있어요. 지적인 자극과 정서적 안정을 함께 나눌 수 있는 관계를 꿈꿔요 ✨`
      ],
      'ISFJ': [
        `반가워요, ${name}입니다 🌷 따뜻한 ISFJ답게 주변 사람들을 챙기는 걸 좋아해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 즐기며` : '소소한 일상을 즐기며'} 안정적이고 편안한 삶을 추구하죠. 서로를 배려하고 신뢰할 수 있는, 오래도록 함께할 수 있는 관계를 만들어가고 싶어요 💕`,
        `${name}이라고 해요 🏡 세심한 ISFJ의 마음으로 작은 것에도 감사하며 살아가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}${otherKeywords.length > 1 ? `과 ${otherKeywords[1].replace('#', '')}` : ''}를 좋아하고,` : '일상의 행복을 찾으며'} 진실된 마음으로 관계를 만들어가요. 서로의 일상을 따뜻하게 채워줄 수 있는 특별한 사람을 기다려요 🌸`
      ],
      'ESFP': [
        `안녕! ${name}이에요 🎉 활발한 ESFP답게 매 순간을 즐겁게 살아가려고 노력해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 정말 좋아하고,` : '다양한 활동을 즐기고,'} 새로운 경험을 통해 삶을 풍요롭게 만들어가죠. 함께 웃고 즐길 수 있는, 긍정적인 에너지를 나눌 수 있는 사람을 찾고 있어요 🌈`,
        `${name}입니다 ✨ 자유로운 ESFP의 영혼으로 순간순간을 소중히 여겨요. ${otherKeywords.length > 0 ? `특히 ${otherKeywords[0].replace('#', '')}할 때 가장 행복하고,` : '즐거운 시간을 보낼 때 가장 행복하고,'} 주변 사람들과 그 기쁨을 나누는 걸 좋아해요. 서로의 일상을 특별하게 만들어줄 수 있는 밝은 관계를 원해요 🎈`
      ],
      'INFJ': [
        `${name}입니다 🌠 깊이 있는 INFJ답게 의미 있는 연결을 추구해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 내면의 평화를 찾고,` : '조용한 성찰을 통해 성장하며,'} 진정성 있는 관계를 소중히 여기죠. 서로의 영혼을 이해하고 함께 성장할 수 있는 깊은 관계를 꿈꿔요 💫`,
        `안녕하세요, ${name}이에요 🌙 직관적인 INFJ의 시선으로 세상을 바라봐요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 관심이 많고,` : '다양한 것에 관심을 가지며'} 삶의 의미를 탐구하는 걸 좋아해요. 서로의 꿈과 가치관을 공유하며 함께 걸어갈 수 있는 특별한 인연을 기다려요 ✨`
      ],
      'ISTP': [
        `${name}이에요 🔧 실용적인 ISTP답게 행동으로 보여주는 스타일이에요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 즐기며` : '다양한 활동을 즐기며'} 자유롭게 살아가고 있어요. 서로의 공간을 존중하면서도 함께할 때 편안한, 균형 잡힌 관계를 추구해요 🏔️`,
        `반가워요, ${name}입니다 ⚙️ 독립적인 ISTP지만 진정한 연결은 소중히 여겨요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 열중하며` : '자신만의 취미를 즐기며'} 꾸준히 실력을 쌓아가고 있죠. 과하지 않은 관심과 편안한 동행이 가능한 관계를 만들어가고 싶어요 🌿`
      ],
      'ENFJ': [
        `안녕하세요, ${name}입니다 🌟 따뜻한 ENFJ답게 사람들과의 연결을 소중히 여겨요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 다른 사람들과 교감하고,` : '진정한 소통을 추구하며'} 서로에게 긍정적인 영향을 주고받는 관계를 만들어가죠. 함께 성장하고 서로의 가능성을 이끌어낼 수 있는 특별한 인연을 기다려요 💕`,
        `${name}이에요 🎭 공감능력이 뛰어난 ENFJ의 마음으로 세상을 따뜻하게 만들어가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 열정을 쏟으며,` : '의미 있는 일에 열정을 쏟으며,'} 주변 사람들에게 영감을 주려고 노력해요. 서로의 꿈을 응원하고 함께 더 나은 미래를 만들어갈 수 있는 관계를 꿈꿔요 ✨`
      ],
      'INTP': [
        `${name}입니다 💭 분석적인 INTP답게 세상의 원리를 탐구하는 걸 좋아해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 대해 깊이 연구하며,` : '지적 호기심을 충족시키며'} 끊임없이 배우고 성장하고 있어요. 지적인 대화와 조용한 애정을 나눌 수 있는, 서로를 이해하는 관계를 원해요 🌌`,
        `안녕하세요, ${name}이에요 🔭 호기심 많은 INTP의 시선으로 세상을 관찰해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 푹 빠져있고,` : '다양한 분야를 탐구하며'} 논리적으로 사고하는 걸 즐기죠. 서로의 생각을 존중하고 함께 지적 성장을 이룰 수 있는 편안한 관계를 만들어가고 싶어요 💫`
      ],
      'ENTJ': [
        `${name}입니다 👑 리더십 있는 ENTJ답게 목표를 향해 전진하고 있어요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 실력을 쌓으며,` : '꾸준한 성장을 추구하며,'} 더 큰 비전을 실현하기 위해 노력하죠. 서로를 동기부여하고 함께 성공을 만들어갈 수 있는 파트너를 찾고 있어요 🚀`,
        `안녕하세요, ${name}이에요 💼 야심찬 ENTJ의 열정으로 매일을 의미 있게 만들어가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 전문성을 갖추고,` : '자신만의 분야에서 성과를 내며,'} 계속해서 발전하고 있어요. 서로의 목표를 지지하고 함께 더 높은 곳을 향해 나아갈 수 있는 관계를 원해요 ⭐`
      ],
      'ISTJ': [
        `반가워요, ${name}입니다 📚 신중한 ISTJ답게 안정적이고 의미 있는 삶을 추구해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 꾸준히 하며` : '일상의 루틴을 소중히 여기며'} 차근차근 목표를 달성해가고 있어요. 서로를 신뢰하고 의지할 수 있는, 오래도록 함께할 수 있는 진실한 관계를 만들어가고 싶어요 🌳`,
        `${name}이라고 해요 🏛️ 책임감 강한 ISTJ의 마음으로 매사에 최선을 다해요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 진심을 다하고,` : '맡은 일에 최선을 다하며,'} 주변 사람들에게 믿음을 주려고 노력하죠. 서로의 가치관을 존중하고 안정적인 미래를 함께 만들어갈 수 있는 관계를 꿈꿔요 💎`
      ],
      'ESTJ': [
        `${name}입니다 💪 실행력 있는 ESTJ답게 계획한 것을 착실히 이루어가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 성취감을 느끼며,` : '목표를 달성하며 성취감을 느끼고,'} 효율적인 삶을 추구하죠. 서로의 성장을 도우며 함께 발전할 수 있는 건강한 관계를 원해요 🎯`,
        `안녕하세요, ${name}이에요 🏆 목표지향적인 ESTJ의 추진력으로 인생을 개척해가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 열중하며` : '다양한 활동에 참여하며'} 리더십을 발휘하고 있어요. 서로를 존중하고 함께 성장할 수 있는, 든든한 파트너십을 만들어가고 싶어요 ⚡`
      ],
      'ESFJ': [
        `반가워요! ${name}입니다 💖 친화력 좋은 ESFJ답게 사람들과의 관계를 소중히 여겨요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 즐기며` : '함께하는 시간을 즐기며'} 따뜻한 추억을 만들어가고 있어요. 서로를 배려하고 챙겨주며, 일상의 행복을 함께 나눌 수 있는 관계를 꿈꿔요 🌺`,
        `${name}이라고 해요 🤗 배려심 깊은 ESFJ의 마음으로 주변을 따뜻하게 만들어요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 즐거움을 나누고,` : '일상의 작은 것들에 감사하며'} 긍정적인 에너지를 전파하죠. 서로의 일상을 풍요롭게 만들어줄 수 있는 특별한 인연을 기다려요 ✨`
      ],
      'ISFP': [
        `${name}이에요 🎨 감성적인 ISFP답게 나만의 속도로 삶을 즐기고 있어요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에서 영감을 받으며,` : '예술적인 감성을 추구하며,'} 진정한 나를 표현하려고 노력해요. 서로의 개성을 존중하고 편안하게 함께할 수 있는 자유로운 관계를 원해요 🌈`,
        `안녕하세요, ${name}입니다 🌿 섬세한 ISFP의 감성으로 아름다움을 발견해가요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 사랑하고,` : '자연과 예술을 사랑하며,'} 순간순간의 감정을 소중히 여기죠. 서로의 내면을 이해하고 있는 그대로 받아들여주는 따뜻한 관계를 만들어가고 싶어요 💝`
      ],
      'ESTP': [
        `${name}입니다 🏃 활동적인 ESTP답게 현재를 즐기며 살아가요! ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}로 스릴을 만끽하며,` : '다양한 경험을 추구하며,'} 매일을 흥미롭게 만들어가죠. 함께 모험을 즐기고 순간을 만끽할 수 있는 에너지 넘치는 관계를 원해요 ⚡`,
        `안녕! ${name}이에요 🎯 실용적인 ESTP의 감각으로 인생을 즐겨요. ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 푹 빠져있고,` : '액티브한 활동을 좋아하고,'} 도전을 두려워하지 않죠. 서로에게 활력을 주고 함께 성장할 수 있는 다이나믹한 관계를 만들어가고 싶어요 🔥`
      ]
    }
    
    // General templates if no MBTI or MBTI not in our list
    const generalTemplates = [
      `안녕하세요, ${name}입니다 ✨ ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 사랑하고,` : '일상의 작은 행복을 찾으며'} 매일을 특별하게 만들어가려고 노력해요. ${otherKeywords.length > 1 ? `특히 ${otherKeywords[1].replace('#', '')}할 때 가장 나다운 모습이 되는 것 같아요.` : '진정한 나를 보여줄 수 있는 편안한 관계를 추구해요.'} 서로의 일상에 자연스럽게 스며들어 함께 성장할 수 있는 따뜻한 인연을 기다려요 🌸`,
      `${name}이에요 🌟 ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 푹 빠져있고,` : '새로운 것을 배우는 걸 좋아하고,'} 작은 순간들도 의미 있게 만들어가는 중이에요. ${otherKeywords.length > 1 ? `${otherKeywords[1].replace('#', '')}도 제 삶의 중요한 부분이죠.` : '일상 속에서 행복을 찾아가고 있어요.'} 진솔한 대화와 따뜻한 마음을 나눌 수 있는, 서로에게 힘이 되는 관계를 만들어가고 싶어요 💝`,
      `반가워요! ${name}입니다 💫 ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}를 통해 삶의 즐거움을 찾고,` : '일상에서 소소한 행복을 발견하며'} 긍정적인 에너지로 하루하루를 채워가요. ${otherKeywords.length > 1 ? `${otherKeywords[1].replace('#', '')}도 빼놓을 수 없는 취미예요.` : '새로운 경험도 즐기는 편이에요.'} 서로의 이야기에 귀 기울이고 함께 웃을 수 있는 편안한 관계를 꿈꿔요 🌈`,
      `${name}이라고 해요 🌺 ${otherKeywords.length > 0 ? `${otherKeywords[0].replace('#', '')}에 관심이 많고,` : '다양한 것들에 호기심을 가지고'} 꾸준히 성장하려고 노력하는 중이에요. ${otherKeywords.length > 1 ? `${otherKeywords[1].replace('#', '')}를 하면서 스트레스를 풀기도 하죠.` : '일과 휴식의 균형을 중요하게 생각해요.'} 서로를 있는 그대로 인정하고 함께 더 나은 사람이 될 수 있는 관계를 원해요 ✨`
    ]
    
    // Select appropriate template
    if (mbtiType && mbtiTemplates[mbtiType]) {
      const templates = mbtiTemplates[mbtiType]
      return templates[Math.floor(Math.random() * templates.length)]
    } else {
      return generalTemplates[Math.floor(Math.random() * generalTemplates.length)]
    }
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
