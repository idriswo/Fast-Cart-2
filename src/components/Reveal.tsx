import { useEffect } from "react";
import type { ReactNode } from "react";
import AOS from "aos";

/**
 * Анимацияи ягонаи классикӣ бо AOS — танҳо "fade-up".
 * Ҳама ҷо ҳамин услуби ягона: нарм, аз поён ба боло, як маротиба.
 * `delay` барои stagger-и сабук, `className` барои layout (grid/flex).
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
  // Контенти динамикӣ (баъди боргирии API) бояд аз нав сабт шавад
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up" data-aos-delay={delay || undefined} className={className}>
      {children}
    </div>
  );
}
