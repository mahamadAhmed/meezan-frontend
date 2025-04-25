
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { Card } from "@/shared/components/ui/card";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: IconType;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
  route: string;
}

const colorVariants = {
  blue: {
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-900/20',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-300',
    valueColor: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-100 dark:border-blue-800/30'
  },
  green: {
    bgLight: 'bg-green-50',
    bgDark: 'dark:bg-green-900/20',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-600 dark:text-green-300',
    valueColor: 'text-green-700 dark:text-green-300',
    border: 'border-green-100 dark:border-green-800/30'
  },
  purple: {
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-900/20',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-300',
    valueColor: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-100 dark:border-purple-800/30'
  },
  amber: {
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900/20',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-300',
    valueColor: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-100 dark:border-amber-800/30'
  },
  red: {
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-900/20',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-600 dark:text-red-300',
    valueColor: 'text-red-700 dark:text-red-300',
    border: 'border-red-100 dark:border-red-800/30'
  }
};

const StatCard = ({ label, value, icon: Icon, color, route }: StatCardProps) => {
  const colors = colorVariants[color];
  
  return (
    <Link to={route}>
      <Card className={`${colors.bgLight} ${colors.bgDark} backdrop-blur-sm border ${colors.border} hover:shadow-md transition-shadow cursor-pointer`}>
        <div className="flex items-center p-5">
          <div className={`mr-4 p-3 rounded-full ${colors.iconBg}`}>
            <Icon className={`h-7 w-7 ${colors.iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
            <h3 className={`text-2xl font-bold ${colors.valueColor}`}>{value}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StatCard;
