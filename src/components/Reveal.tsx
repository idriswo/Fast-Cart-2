import { Fade } from "react-awesome-reveal";
import type { ReactNode } from "react";

/**
 * Анимацияи ягонаи классикӣ бо `react-awesome-reveal`.
 * Fade танҳо анимация мекунад (fade-up), layout дар div-и дохилӣ —
 * то grid/flex вайрон нашавад. Ҳама ҷо ҳамин услуби ягона.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Fade
      direction="up"
      triggerOnce
      duration={700}
      delay={delay}
      fraction={0.15}
      style={{ width: "100%" }}
    >
      <div className={className}>{children}</div>
    </Fade>
  );
}
