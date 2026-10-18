// Who the site is about. Read by the hero and the contact list.

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const profile = {
  name: 'Vince Loo',
  handle: 'POTATO0826',
  headline: 'A Tech Guy who is caffeinated.',
  location: 'Malaysia 🇲🇾',
  university: "Taylor's University",
}

export type Contact = { icon: string; label: string; href: string; val: string }

export const contacts: Contact[] = [
  { icon: 'https://cdn.simpleicons.org/gmail',          label: 'Email',     href: 'mailto:loovincent268@gmail.com',                  val: 'loovincent268@gmail.com' },
  { icon: `${DEVICON}/linkedin/linkedin-original.svg`,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/vince-loo-82565a31b', val: 'Vince Loo' },
  { icon: 'https://cdn.simpleicons.org/instagram',      label: 'Instagram', href: 'https://www.instagram.com/vince__loo/',           val: 'vince__loo' },
  { icon: 'https://cdn.simpleicons.org/github/e6e8ec',  label: 'GitHub',    href: 'https://github.com/POTATO0826',                   val: 'POTATO0826' },
  { icon: 'https://cdn.simpleicons.org/x/e6e8ec',       label: 'X',         href: 'https://x.com/vince1oo',                          val: '@vince1oo' },
  { icon: 'https://cdn.simpleicons.org/whatsapp',       label: 'WhatsApp',  href: 'https://wa.link/4ixpfx',                          val: 'Chat now' },
]
