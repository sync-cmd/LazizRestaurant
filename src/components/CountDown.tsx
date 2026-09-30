"use client"

import React, { useEffect, useState } from "react"
import Countdown from "react-countdown"


type CountDownProps = {
  endDate: string
}

const CountDown = ({ endDate }: CountDownProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const endingDate = new Date(endDate)

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    if (completed) {
      return (
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#7a2e0e]">
            Offer ended
          </span>
        </div>
      )
    }

    const timeUnits = [
      { value: days, label: "Days" },
      { value: hours, label: "Hours" },
      { value: minutes, label: "Min" },
      { value: seconds, label: "Sec" },
    ]

    return (
      <div className="flex items-center gap-3 sm:gap-4">
        

        {/* Time */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="flex min-w-11.25 flex-col items-center sm:min-w-13">
                <div className="flex h-12 w-full items-center justify-center rounded-xl border border-[#e8c59f] bg-white/70 px-2 shadow-sm backdrop-blur-sm sm:h-14">
                  <span className="font-mono text-xl font-bold tabular-nums text-[#7a2e0e] sm:text-2xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>

                <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9c5a0e] sm:text-[9px]">
                  {unit.label}
                </span>
              </div>

              {index < timeUnits.length - 1 && (
                <span className="mb-4 text-lg font-bold text-[#f97316] sm:text-xl">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
    
     

      {isMounted ? (
        <Countdown
          date={endingDate}
          renderer={renderer}
        />
      ) : (
        <div className="flex items-center gap-3">
         

          <div className="flex gap-1.5 sm:gap-2">
            {["00", "00", "00", "00"].map((value, index) => (
              <React.Fragment key={index}>
                <div className="flex h-12 w-11 items-center justify-center rounded-xl border border-[#e8c59f] bg-white/70 sm:h-14 sm:w-12">
                  <span className="font-mono text-xl font-bold text-[#7a2e0e] sm:text-2xl">
                    {value}
                  </span>
                </div>

                {index < 3 && (
                  <span className="self-center text-lg font-bold text-[#f97316]">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountDown