"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiSettings,
  FiSun,
  FiGlobe as FiLanguage,
  FiClock,
  FiEdit2,
  FiCalendar,
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiAlertCircle,
  FiMenu
} from 'react-icons/fi';
import { type ExtendedUser } from '@/lib/db/types';

// Define types for the component props
type ProfileSectionProps = {
  user: ExtendedUser;
  stats: Array<{ label: string; value: string }>;
};

// Main Profile Section Component
export function ProfileSection({ user, stats }: ProfileSectionProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {stats.map((stat, index) => (
          <ProfileStat 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            index={index}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Details */}
        <ProfileContainer
          title="Account Details"
          icon={<FiInfo />}
          isActive={activeSection === 'account'}
          toggleSection={() => toggleSection('account')}
        >
          <ProfileAccountDetails user={user} />
        </ProfileContainer>

        {/* Social Links */}
        <ProfileContainer
          title="Social Links"
          icon={<FiGlobe />}
          isActive={activeSection === 'social'}
          toggleSection={() => toggleSection('social')}
        >
          <ProfileSocialLinks user={user} />
        </ProfileContainer>

        {/* Preferences */}
        <ProfileContainer
          title="Preferences"
          icon={<FiSettings />}
          isActive={activeSection === 'preferences'}
          toggleSection={() => toggleSection('preferences')}
        >
          <ProfilePreferences user={user} />
        </ProfileContainer>

        {/* Account Status */}
        <ProfileContainer
          title="Account Status"
          icon={<FiCheckCircle />}
          isActive={activeSection === 'status'}
          toggleSection={() => toggleSection('status')}
        >
          <ProfileAccountStatus user={user} />
        </ProfileContainer>
      </div>
    </div>
  );
}

// Profile Header Component
function ProfileHeader({ user }: { user: ExtendedUser }) {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-xl opacity-30"></div>
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image 
              src={`https://avatar.vercel.sh/${user.email}`} 
              alt={user.name || 'User'} 
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              {user.name || 'Anonymous User'}
            </h1>
            <p className="text-xl text-muted-foreground">
              @{user.username || user.email?.split('@')[0] || 'anonymous'}
            </p>
            
            {user.bio && (
              <p className="max-w-xl text-muted-foreground mt-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* Edit Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/profile/edit">
            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiEdit2 size={16} />
              Edit Profile
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Edit Button (Mobile) */}
      <div className="md:hidden px-8 pb-6">
        <Link href="/profile/edit" className="block w-full">
          <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium">
            <FiEdit2 size={16} />
            Edit Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// Profile Stat Component
function ProfileStat({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      className="bg-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: index * 0.1,
            duration: 0.4
          }
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

// Container for Profile Sections
function ProfileContainer({ 
  title, 
  icon, 
  children, 
  isActive, 
  toggleSection 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  isActive: boolean;
  toggleSection: () => void;
}) {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border/40 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="text-muted-foreground">
          {isActive ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Account Details Component
function ProfileAccountDetails({ user }: { user: ExtendedUser }) {
  const details = [
    { icon: <FiUser />, label: 'User ID', value: user.id },
    { icon: <FiMail />, label: 'Email', value: user.email },
    { icon: <FiUser />, label: 'Name', value: user.name || 'Not set' },
    { icon: <FiCalendar />, label: 'Member Since', value: formatDate(user.createdAt) },
    { icon: <FiMapPin />, label: 'Location', value: user.location || 'Not set' },
    { icon: <FiGlobe />, label: 'Website', value: user.website || 'Not set' },
  ];

  return (
    <div className="space-y-4">
      {details.map((detail) => (
        <div key={detail.label} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-muted/30 text-muted-foreground mt-0.5">
            {detail.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{detail.label}</p>
            <p className={`font-medium ${detail.label === 'User ID' ? 'font-mono text-xs bg-muted/50 p-2 rounded-md mt-1 overflow-x-auto' : ''}`}>
              {detail.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Social Links Component
function ProfileSocialLinks({ user }: { user: ExtendedUser }) {
  const socialLinks = [
    { platform: 'github', icon: <FiGithub />, value: user.github },
    { platform: 'twitter', icon: <FiTwitter />, value: user.twitter },
    { platform: 'linkedin', icon: <FiLinkedin />, value: user.linkedin },
  ];

  return (
    <div className="space-y-4">
      {socialLinks.map((link) => (
        <div key={link.platform} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-muted/30 text-muted-foreground mt-0.5">
            {link.icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground capitalize">{link.platform}</p>
            <p className="font-medium">{link.value || 'Not set'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Preferences Component
function ProfilePreferences({ user }: { user: ExtendedUser }) {
  const preferences = [
    { icon: <FiSun />, label: 'Theme', value: user.theme || 'System default' },
    { icon: <FiLanguage />, label: 'Language', value: user.language || 'System default' },
    { icon: <FiClock />, label: 'Timezone', value: user.timezone || 'System default' },
  ];

  return (
    <div className="space-y-4">
      {preferences.map((pref) => (
        <div key={pref.label} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-muted/30 text-muted-foreground mt-0.5">
            {pref.icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{pref.label}</p>
            <p className="font-medium">{pref.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Account Status Component
function ProfileAccountStatus({ user }: { user: ExtendedUser }) {
  const getStatusVariant = (status: boolean | undefined, positive: boolean) => {
    if (status === undefined) return 'bg-muted/20 text-muted-foreground';
    return status === positive
      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
      : 'bg-red-500/20 text-red-600 dark:text-red-400';
  };

  const statuses = [
    { 
      label: 'Email Verified', 
      value: user.isVerified, 
      variant: getStatusVariant(user.isVerified, true),
      icon: user.isVerified ? <FiCheckCircle /> : <FiAlertCircle /> 
    },
    { 
      label: 'Premium User', 
      value: user.isPremium, 
      variant: getStatusVariant(user.isPremium, true),
      icon: user.isPremium ? <FiCheckCircle /> : <FiAlertCircle /> 
    },
    { 
      label: 'Beta Access', 
      value: user.isBeta, 
      variant: getStatusVariant(user.isBeta, true),
      icon: user.isBeta ? <FiCheckCircle /> : <FiAlertCircle /> 
    },
    { 
      label: 'Admin', 
      value: user.isAdmin, 
      variant: getStatusVariant(user.isAdmin, true),
      icon: user.isAdmin ? <FiCheckCircle /> : <FiAlertCircle /> 
    },
    { 
      label: 'Account Active', 
      value: !user.isBanned, 
      variant: getStatusVariant(!user.isBanned, true),
      icon: !user.isBanned ? <FiCheckCircle /> : <FiAlertCircle /> 
    },
  ];

  return (
    <div className="space-y-3">
      {statuses.map((status) => (
        <div key={status.label} className="flex items-center justify-between">
          <span className="text-sm">{status.label}</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.variant}`}>
            <span className="mr-1.5">{status.icon}</span>
            {status.value ? 'Yes' : 'No'}
          </span>
        </div>
      ))}
    </div>
  );
}

// Helper function to format date
function formatDate(date: Date | undefined): string {
  if (!date) return 'Not available';
  
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Add this to your global CSS or define it inline with a pseudo-element
// .bg-grid-pattern {
//   background-image: 
//     linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
//     linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
//   background-size: 20px 20px;
// }