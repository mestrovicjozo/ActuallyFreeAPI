'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from 'react';

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
  style?: CSSProperties;
};

function useInViewOnce(margin = '-80px') {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);

  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = 8,
  duration = 700,
  className,
  as: Tag = 'div',
  style,
}: RevealProps) {
  const { ref, visible } = useInViewOnce();

  const transitionStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
    filter: visible ? 'blur(0)' : `blur(${blur}px)`,
    transition: [
      `opacity ${duration}ms ${EASE} ${delay}s`,
      `transform ${duration}ms ${EASE} ${delay}s`,
      `filter ${duration}ms ${EASE} ${delay}s`,
    ].join(', '),
    willChange: 'opacity, transform, filter',
    ...style,
  };

  // @ts-expect-error - assigning ref to dynamic Tag
  return <Tag ref={ref} className={className} style={transitionStyle}>{children}</Tag>;
}

type StaggerCtxValue = { visible: boolean; stagger: number; baseDelay: number };
const StaggerCtx = createContext<StaggerCtxValue>({ visible: false, stagger: 0.08, baseDelay: 0 });

type StaggerProps = {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
};

export function Stagger({ children, stagger = 0.08, delayChildren = 0, className }: StaggerProps) {
  const { ref, visible } = useInViewOnce();

  // Inject sequential index into direct StaggerItem children so they can compute delay.
  const indexed = Children.map(children, (child, idx) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { __stagger_index?: number };
    if (props.__stagger_index != null) return child;
    return cloneElement(child as ReactElement<{ __stagger_index?: number }>, { __stagger_index: idx });
  });

  return (
    <StaggerCtx.Provider value={{ visible, stagger, baseDelay: delayChildren }}>
      {/* @ts-expect-error - dynamic ref typing */}
      <div ref={ref} className={className}>{indexed}</div>
    </StaggerCtx.Provider>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  blur?: number;
  __stagger_index?: number;
};

export function StaggerItem({
  children,
  className,
  y = 16,
  blur = 6,
  __stagger_index = 0,
}: StaggerItemProps) {
  const { visible, stagger, baseDelay } = useContext(StaggerCtx);
  const delay = baseDelay + __stagger_index * stagger;

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
    filter: visible ? 'blur(0)' : `blur(${blur}px)`,
    transition: [
      `opacity 600ms ${EASE} ${delay}s`,
      `transform 600ms ${EASE} ${delay}s`,
      `filter 600ms ${EASE} ${delay}s`,
    ].join(', '),
    willChange: 'opacity, transform, filter',
  };

  return <div className={className} style={style}>{children}</div>;
}
