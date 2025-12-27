import {
  Bot,
  Cloud,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Network,
  PhoneCall,
  Shield,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type SocialLink = {
  label: string
  href: string
  icon: LucideIcon
}

export type Stat = {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
  featured?: boolean
  links?: ProjectLink[]
}

export type SkillGroup = {
  label: string
  items: string[]
  icon: LucideIcon
}

export type TimelineItem = {
  title: string
  org?: string
  period: string
  bullets: string[]
}

export type Portfolio = {
  name: string
  headline: string
  location: string
  email: string
  summary: string
  cta: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
  socials: SocialLink[]
  stats: Stat[]
  about: string[]
  projects: Project[]
  skills: SkillGroup[]
  certifications: string[]
  timeline: TimelineItem[]
  badges: { label: string; icon: LucideIcon }[]
}

export const portfolio: Portfolio = {
  name: 'Ashder Karim',
  headline: 'Software Engineering Student · IT Support Specialist · Systems & Networking',
  location: 'Islamabad, Pakistan',
  email: 'ashderkarim123@gmail.com',
  summary:
    'I build practical software, automate workflows, and troubleshoot complex systems. I’m especially interested in networking, VoIP, and scalable infrastructure.',
  cta: {
    primary: { label: 'View projects', href: '#projects' },
    secondary: { label: 'Contact me', href: '#contact' },
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/ashderkarim123', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ashder-karim', icon: Linkedin },
    { label: 'Email', href: 'mailto:ashderkarim123@gmail.com', icon: Mail },
  ],
  stats: [
    { label: 'Projects', value: '10+', hint: 'Academic & personal', icon: Code2 },
    { label: 'Automation', value: 'Workflows', hint: 'Sheets → CRM → AI', icon: Bot },
    { label: 'Networking', value: 'VLANs/AD', hint: 'Design & troubleshooting', icon: Network },
    { label: 'VoIP', value: 'Asterisk/SIP', hint: 'Routing & reliability', icon: PhoneCall },
  ],
  about: [
    'Software Engineering student with hands-on experience in IT support, VoIP systems, networking, and automation.',
    'I enjoy building reliable solutions, improving processes, and learning how secure infrastructures scale.',
  ],
  projects: [
    {
      title: 'AI Cold Calling System',
      description:
        'Automation pipeline from Google Sheets to HubSpot, then AI voice workflows for outreach and tracking.',
      tags: ['Automation', 'HubSpot', 'Integrations', 'AI'],
      featured: true,
    },
    {
      title: 'VoIP Load Balancer',
      description:
        'Kamailio-based routing and failover in front of Vicidial to improve call reliability and distribution.',
      tags: ['Kamailio', 'Vicidial', 'SIP', 'Reliability'],
      featured: true,
    },
    {
      title: 'University Network Design',
      description:
        'Network design including VLAN segmentation, firewall rules, and Active Directory for 1000+ users.',
      tags: ['Networking', 'VLAN', 'Active Directory', 'Security'],
    },
    {
      title: 'Cash & Carry Management System',
      description: 'Java inventory and billing system built as an academic project.',
      tags: ['Java', 'CRUD', 'Inventory'],
    },
    {
      title: 'MikroTik Camera Network',
      description: 'VLAN isolation and DHCP configuration for a segmented camera network.',
      tags: ['MikroTik', 'VLAN', 'DHCP'],
    },
    {
      title: 'Remote Access Tool (Academic)',
      description: 'A .NET-based learning project focused on ethical, controlled remote access concepts.',
      tags: ['.NET', 'Networking', 'Security'],
    },
  ],
  skills: [
    { label: 'Languages', items: ['Python', 'C++', 'Java', 'HTML', 'CSS'], icon: Code2 },
    { label: 'Systems & Networking', items: ['Linux', 'MikroTik', 'VLANs', 'Active Directory'], icon: Network },
    { label: 'VoIP', items: ['Asterisk', 'Vicidial', 'Kamailio', 'SIP'], icon: PhoneCall },
    { label: 'Databases', items: ['MySQL', 'MariaDB'], icon: Cloud },
    { label: 'Tools', items: ['Git', 'GitHub', 'WordPress', 'HubSpot'], icon: Wrench },
  ],
  certifications: ['Google IT Support Professional', 'Google Cybersecurity Specialization'],
  timeline: [
    {
      title: 'Software Engineering Student',
      org: 'Undergraduate',
      period: 'Current',
      bullets: ['Building practical apps and improving system reliability through automation and good tooling.'],
    },
    {
      title: 'IT Support / Systems',
      period: 'Hands-on experience',
      bullets: ['Troubleshooting, VoIP operations, and network support across Linux-based systems.'],
    },
  ],
  badges: [
    { label: 'IT Support', icon: Wrench },
    { label: 'Networking', icon: Network },
    { label: 'VoIP', icon: PhoneCall },
    { label: 'Cybersecurity', icon: Shield },
    { label: 'Cloud', icon: Cloud },
    { label: 'Learning', icon: GraduationCap },
  ],
}

