import React from 'react'
import LegalPage from './LegalPage'
import { useLanguage } from '../../context/LanguageContext'
import { privacyEyebrow, privacyTitle, privacyUpdated, privacyBody } from './privacyData'

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage()
  const bodyText = t(privacyBody)
  const lines = bodyText.split('\n')
  const intro: string[] = []
  const sections: { title: string; content: string[] }[] = []
  let current: { title: string; content: string[] } | null = null

  for (const line of lines) {
    if (/^\d+\.\s/.test(line)) {
      if (current) sections.push(current)
      current = { title: line, content: [] }
    } else {
      if (current) current.content.push(line)
      else intro.push(line)
    }
  }
  if (current) sections.push(current)

  return (
    <LegalPage
      eyebrow={t(privacyEyebrow)}
      title={<span className="text-orange">{t(privacyTitle)}</span>}
      updated={t(privacyUpdated)}
    >
      <div>
        <p className="mb-6 whitespace-pre-line align-middle font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-stone-500">
          {intro.join('\n')}
        </p>
        {sections.map((s, i) => (
          <section key={i} className="mb-6">
            <h2 className="mb-4 font-inter font-medium text-[16px] leading-[20px] tracking-[-0.02em] text-[#1B1D20] align-middle">
              {s.title}
            </h2>
            <div className="whitespace-pre-line align-middle font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-stone-500">
              {s.content.join('\n')}
            </div>
          </section>
        ))}
      </div>
    </LegalPage>
  )
}

export default PrivacyPolicyPage
