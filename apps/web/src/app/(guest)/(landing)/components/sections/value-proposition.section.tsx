'use client'

import { motion } from 'framer-motion'
import {
  CircleDollarSignIcon,
  ShieldCheckIcon,
  SquareMousePointerIcon,
} from 'lucide-react'

const VALUE_CARDS = [
  {
    title: '비용 걱정 없이',
    description:
      '실제 AWS 요금 폭탄을 맞을 걱정 없이 마음껏 실습하세요. 시뮬레이션 환경에서 무제한으로 연습할 수 있습니다.',
    Icon: CircleDollarSignIcon,
    wrapperClass: 'bg-[#E9FDE2]',
    iconClass: 'text-[#43A625]',
  },
  {
    title: '안전한 학습 환경',
    description:
      '잘못된 설정으로 인한 보안 사고나 데이터 손실 걱정 없이 안심하고 학습하세요. 샌드박스 환경에서 자유롭게 실험할 수 있습니다.',
    Icon: ShieldCheckIcon,
    wrapperClass: 'bg-primary-foreground',
    iconClass: 'text-primary',
  },
  {
    title: '시각화된 다이어그램',
    description:
      '복잡한 AWS 아키텍처를 직관적인 다이어그램으로 확인하며 학습하세요. 인프라 구성을 한눈에 이해할 수 있습니다.',
    Icon: SquareMousePointerIcon,
    wrapperClass: 'bg-[#FDEEF8]',
    iconClass: 'text-[#ED61BB]',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const ValuePropositionSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-36 pb-48">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">왜 클라우드 크래프트인가요?</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          안전하고 효과적인 학습 환경을 제공합니다
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {VALUE_CARDS.map(
          ({ title, description, Icon, wrapperClass, iconClass }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="border-border bg-card flex flex-col items-center rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${wrapperClass}`}
              >
                <Icon className={`h-8 w-8 ${iconClass}`} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          ),
        )}
      </motion.div>
    </section>
  )
}
