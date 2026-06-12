import { User, TrendingUp, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../ui/StatCard';
import SectionHeader from '../ui/SectionHeader';

function getRankColorClass(rank) {
  if (!rank) return '';
  const normalized = rank.toLowerCase().replace(/\s+/g, '-');
  return `rank-${normalized}`;
}

export default function ProfileStats({ profile }) {
  if (!profile) return null;

  const stats = [
    {
      icon: User,
      label: 'Handle',
      value: profile.handle,
      className: '',
    },
    {
      icon: TrendingUp,
      label: 'Current Rating',
      value: profile.rating ?? '—',
      className: '',
    },
    {
      icon: Trophy,
      label: 'Max Rating',
      value: profile.max_rating ?? '—',
      className: '',
    },
    {
      icon: Award,
      label: 'Rank',
      value: profile.rank ?? '—',
      className: `rank-value ${getRankColorClass(profile.rank)}`,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={User}
        title="Profile Overview"
        description="Your Codeforces competitive programming stats"
      />
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            className={stat.className}
            delay={index * 0.08}
          />
        ))}
      </div>
    </motion.section>
  );
}
