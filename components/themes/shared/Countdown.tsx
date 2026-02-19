"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string;
  textColor?: string;
  labelColor?: string;
  dividerColor?: string;
}

export function Countdown({
  targetDate,
  textColor = "#2D423F",
  labelColor = "#A89A82",
  dividerColor = "rgba(168, 154, 130, 0.3)"
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!targetDate) return;

      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-1.5 sm:gap-4 md:gap-8 justify-center py-8">
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.8 }}
          className="flex flex-col items-center min-w-[44px] sm:min-w-[60px] md:min-w-[80px]"
        >
          <div
            className="text-xl sm:text-3xl md:text-5xl font-light font-serif tabular-nums"
            style={{ color: textColor }}
          >
            {item.value.toString().padStart(2, '0')}
          </div>
          <div
            className="w-5 sm:w-8 h-[1px] my-1.5 sm:my-2"
            style={{ backgroundColor: dividerColor }}
          />
          <span
            className="text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] font-bold font-sans"
            style={{ color: labelColor }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
