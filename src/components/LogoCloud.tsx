import InfiniteSlider from './InfiniteSlider'

interface Logo {
  src: string
  alt: string
  width?: number
  height?: number
}

interface Props {
  className?: string
  logos?: Logo[]
  heading?: string
  subheading?: string
  /** Force the light-theme palette regardless of the app's dark class. */
  lightBg?: boolean
}

// Placeholder company logos pulled from svgl.app (same source as the
// shadcn reference). Swap with real client logos when ready.
const DEFAULT_LOGOS: Logo[] = [
  { src: 'https://svgl.app/library/nvidia-wordmark-light.svg', alt: 'Nvidia' },
  { src: 'https://svgl.app/library/openai_wordmark_light.svg', alt: 'OpenAI' },
  { src: 'https://svgl.app/library/vercel_wordmark.svg', alt: 'Vercel' },
  { src: 'https://svgl.app/library/github_wordmark_light.svg', alt: 'GitHub' },
  { src: 'https://svgl.app/library/supabase_wordmark_light.svg', alt: 'Supabase' },
  { src: 'https://svgl.app/library/claude-ai-wordmark-icon_light.svg', alt: 'Claude' },
  { src: 'https://svgl.app/library/turso-wordmark-light.svg', alt: 'Turso' },
  { src: 'https://svgl.app/library/clerk-wordmark-light.svg', alt: 'Clerk' },
]

export default function LogoCloud({
  className,
  logos = DEFAULT_LOGOS,
  heading,
  subheading,
  lightBg = false,
}: Props) {
  const sectionBg = lightBg ? 'bg-white' : 'bg-gray-50 dark:bg-[#0a0f1a]'
  const mutedText = lightBg
    ? 'text-gray-500'
    : 'text-gray-500 dark:text-gray-400'
  const headingColor = lightBg
    ? 'text-gray-900'
    : 'text-gray-900 dark:text-white'
  const divider = lightBg ? 'bg-gray-200' : 'bg-gray-200 dark:bg-gray-800'
  // Logo invert — svgl "light" marks are white-on-transparent. In the
  // light variant we invert them to black so they read on white.
  const logoImgClass = lightBg
    ? 'pointer-events-none h-4 w-auto select-none md:h-5 opacity-70 hover:opacity-100 invert brightness-0'
    : 'pointer-events-none h-4 w-auto select-none md:h-5 opacity-70 hover:opacity-100'

  return (
    <section className={`${sectionBg} ${className ?? ''} py-12 md:py-16`}>
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        {(heading || subheading) && (
          <>
            <h2
              className={`mb-5 text-center font-medium text-xl tracking-tight md:text-2xl ${headingColor}`}
            >
              {subheading && (
                <span className={mutedText}>{subheading}</span>
              )}
              {heading && (
                <>
                  {subheading && <br />}
                  <span className="font-semibold">{heading}</span>
                </>
              )}
            </h2>
            <div
              className={`mx-auto my-5 h-px max-w-sm [mask-image:linear-gradient(to_right,transparent,black,transparent)] ${divider}`}
            />
          </>
        )}

        <div className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={logoImgClass}
                height={logo.height ?? undefined}
                width={logo.width ?? undefined}
              />
            ))}
          </InfiniteSlider>
        </div>

        {(heading || subheading) && (
          <div
            className={`mx-auto mt-5 h-px max-w-sm [mask-image:linear-gradient(to_right,transparent,black,transparent)] ${divider}`}
          />
        )}
      </div>
    </section>
  )
}
