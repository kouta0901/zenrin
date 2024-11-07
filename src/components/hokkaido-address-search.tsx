"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"

const sampleAddresses = [
  {
    id: 1,
    address: "北海道札幌市中央区南１条西１４丁目２９１−１９０",
    postalCode: "060-8570",
    lat: 43.065229893327036,
    lng: 141.36336791424677,
    details: "札幌市中心部に位置する、商業施設やオフィスが集まるエリア",
    url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214381.13660733798!2d141.27913681096356!3d42.919264929300766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29915df8ac8f%3A0xcb5d87467f22df79!2z5Lit5p2R6KiY5b-155eF6Zmi!5e0!3m2!1sja!2sjp!4v1728276094486!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
    id: 2,
    address: "北海道札幌市中央区円山西町４丁目７−２５",
    postalCode: "064-0944",
    lat: 43.04013248400743,
    lng: 141.3041994662596,
    details: "円山公園近くの静かな住宅街",
    url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2916.06714278998!2d141.30160308808277!3d43.04001878292482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0ad61b4fbd6fd1%3A0x89b054419ea0cac6!2z5Yy755mC5rOV5Lq65riT5LuB5LyaIOacreW5jOilv-WGhuWxseeXhemZog!5e0!3m2!1sja!2sjp!4v1728276161953!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
    id: 3,
    address: "北海道札幌市中央区宮の森３条７丁目５−２５",
    postalCode: "064-0953",
    lat: 43.062318098586886,
    lng: 141.30363137984793,
    details: "宮の森エリアの高級住宅街",
    url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.012882943973!2d141.30270869999998!3d43.0621966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29cf06cfa439%3A0x51c3ae2b20262b90!2z5Yy755mC5rOV5Lq66K6D55Sf5LyaIOWuruOBruajruiomOW_teeXhemZog!5e0!3m2!1sja!2sjp!4v1728276227591!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
    id: 4,
    address: "北海道札幌市中央区南２２条西１４丁目１−２０",
    postalCode: "064-0922",
    lat: 43.030386758055585,
    lng: 141.33900828436555,
    details: "札幌市南側の住宅エリア、緑豊かな環境",
    url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4956.3014440768575!2d141.33751323903476!3d43.029807003194385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b2a092a8867a7%3A0x41e257eafd30153b!2z5Yy755mC5rOV5Lq656S-5Zuj5oWI6Je75LyaIOW5s-advuiomOW_teeXhemZog!5e0!3m2!1sja!2sjp!4v1728276321353!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
    id: 5,
    address: "北海道釧路市末広町１３丁目１−４",
    postalCode: "085-0014",
    lat: 42.989253273576225,
    lng: 144.38499242351858,
    details: "釧路市中心部、港に近いエリア",
    url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4199.51732520583!2d144.38371106279416!3d42.98895401701954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f723d62f34c6095%3A0x58f74834db9381e4!2zQUlH44Ko44K444K944Oz55Sf5ZG95L-d6Zm644ixIOmHp-i3r-OCqOOCpOOCuOOCp-ODs-OCt-ODvOOCquODleOCo-OCuQ!5e0!3m2!1sja!2sjp!4v1728276428050!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
]

type AddressResult = typeof sampleAddresses[0]

function normalizeJapanese(text: string): string {
  return text
    .replace(/[ぁ-ん]/g, char => String.fromCharCode(char.charCodeAt(0) + 0x60))
    .replace(/[ァ-ン]/g, char => String.fromCharCode(char.charCodeAt(0) + 0x60))
    .replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .replace(/[Ａ-Ｚａ-ｚ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .replace(/[\s　]/g, '')
    .replace(/[−ー]/g, '-')
    .replace(/[広廣]/g, '広')
    .replace(/[桧檜]/g, '桧')
    .replace(/[舗舖]/g, '舗')
    .replace(/[辺邊邉]/g, '辺')
    .replace(/[釧釗]/g, '釧')
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

function fuzzyMatch(input: string, target: string): boolean {
  const normalizedInput = normalizeJapanese(input)
  const normalizedTarget = normalizeJapanese(target)

  if (normalizedTarget.includes(normalizedInput)) return true

  const inputParts = normalizedInput.split(/([^\p{L}\p{N}]+)/u)
  const targetParts = normalizedTarget.split(/([^\p{L}\p{N}]+)/u)

  let matchCount = 0
  let totalParts = 0

  for (const inputPart of inputParts) {
    if (inputPart.trim() === '') continue
    totalParts++
    for (const targetPart of targetParts) {
      const distance = levenshteinDistance(inputPart, targetPart)
      if (distance <= Math.max(2, Math.floor(targetPart.length / 3))) {
        matchCount++
        break
      }
    }
  }

  return matchCount >= totalParts * 0.7 // 70% match threshold
}

export function HokkaidoAddressSearchComponent() {
  const [address, setAddress] = useState("")
  const [results, setResults] = useState<AddressResult[]>([])

  const handleSearch = () => {
    const searchResults = sampleAddresses.filter(item => 
      fuzzyMatch(address, item.address) || fuzzyMatch(address, item.postalCode)
    )
    setResults(searchResults)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-blue-100 to-green-100 min-h-screen">
      <Card className="backdrop-blur-md bg-white/30 border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-800">北海道住所検索サービス</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-8">
            <Input
              type="text"
              placeholder="住所または郵便番号を入力（曖昧検索対応）"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/50 border-green-200 focus:border-green-400 focus:ring-green-300"
              aria-label="住所または郵便番号検索（曖昧検索対応）"
            />
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white">
              検索
            </Button>
          </div>
          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-xl text-green-800 mb-4">検索結果:</h3>
              <ul className="space-y-4">
                {results.map((result) => (
                  <motion.li 
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/60 rounded-lg shadow-md overflow-hidden"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full p-4 text-left hover:bg-green-50 transition duration-200">
                          <div>
                            <h4 className="font-medium text-lg text-green-700">{result.address}</h4>
                            <p className="text-sm text-green-600">〒{result.postalCode}</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] bg-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-green-800">{result.address}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p className="text-green-700"><strong>郵便番号:</strong> {result.postalCode}</p>
                          <p className="text-green-700"><strong>詳細情報:</strong> {result.details}</p>
                          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg" dangerouslySetInnerHTML={{ __html: result.url }} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : address && (
            <p className="text-center text-green-600">検索結果が見つかりませんでした。</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}