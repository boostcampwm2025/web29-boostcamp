'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'

export const CoreFeaturesSection = () => {
  return (
    <section className="bg-primary-foreground/30 flex flex-col gap-60 py-52">
      <motion.div
        className="flex justify-center gap-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Image
          src="/images/problem-list.svg"
          alt="문제 목록"
          width={600}
          height={400}
          className="rounded-lg shadow-xl"
        />

        <div className="flex w-125 flex-col justify-center gap-10">
          <p className="text-4xl font-bold text-zinc-800">
            원하는 방식으로 문제를 선택하세요
          </p>

          <div className="pb-20 text-xl font-semibold text-zinc-700">
            <p>유닛 문제부터 주제별 쿡북까지</p>
            <p>목적에 맞는 문제를 골라 바로 풀어볼 수 있어요.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center gap-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Image
          src="/images/problem-detail.svg"
          alt="문제 상세"
          width={600}
          height={400}
          className="rounded-lg shadow-xl"
        />

        <div className="flex w-125 flex-col justify-center gap-10">
          <p className="text-4xl font-bold text-zinc-800">
            직접 입력하고, 바로 확인하세요
          </p>

          <div className="pb-20 text-xl font-semibold text-zinc-700">
            <p>직접 입력한 설정 값으로</p>
            <p>변화하는 다이어그램과 리소스를 확인하세요.</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
