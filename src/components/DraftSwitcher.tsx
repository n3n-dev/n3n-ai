interface Props {
  /** When "auto" (default), the active button is decided by the current
   *  pathname. Pass an explicit label to force one to render as active —
   *  Draft 0.5 uses this so its in-place variant 2/3 toggles still register
   *  even though the URL is /draft0-5 in both cases. */
  active?: string
  /** "light" — for dark heroes, "dark" — for light heroes. Default "dark". */
  theme?: 'light' | 'dark'
}

export default function DraftSwitcher(_props: Props) {
  return null
}
