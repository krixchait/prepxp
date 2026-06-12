import { motion } from 'framer-motion';
import { PieChart as PieChartIcon } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import SectionHeader from '../ui/SectionHeader';

const COLORS = [
  '#7c3aed', '#3b82f6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6',
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{name}</div>
      <div className="tooltip-value">{value} problems solved</div>
    </div>
  );
}

export default function TopicChart({ topics }) {
  if (!topics) return null;

  const data = Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([topic, count]) => ({
      name: topic,
      value: count,
    }));

  if (data.length === 0) return null;

  return (
    <motion.div
      className="glass-card-static chart-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <SectionHeader
        icon={PieChartIcon}
        title="Topic Distribution"
        description="Top 8 problem categories you've solved"
      />
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ filter: 'brightness(1.1)' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: '12px',
              fontFamily: 'var(--font-family)',
              color: 'var(--text-secondary)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
