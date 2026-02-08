'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Calendar,
  ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Film,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@uwrap/ui';

interface DashboardShellProps {
  children: ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Progetti', href: '/projects', icon: FolderOpen },
  { name: 'Script', href: '/scripts', icon: FileText },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Assets', href: '/assets', icon: ImageIcon },
];

const secondaryNavigation = [
  { name: 'Impostazioni', href: '/settings', icon: Settings },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const NavLink = ({ item, isSecondary = false }: { item: typeof navigation[0]; isSecondary?: boolean }) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
    
    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]',
          isActive
            ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
            : 'text-purple-300/60 hover:bg-purple-950/50 hover:text-purple-200'
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {(sidebarOpen || mobileMenuOpen) && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="truncate"
          >
            {item.name}
          </motion.span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-xl border-b border-purple-900/30 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
              <Film className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">uWrap</span>
          </Link>

          <div className="flex items-center gap-2">
            <button 
              className="p-2.5 rounded-xl text-purple-400 hover:bg-purple-950/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-purple-400 hover:bg-purple-950/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-16 bottom-0 w-[280px] bg-black border-r border-purple-900/30 z-50 overflow-y-auto"
            >
              {/* User Section - Mobile */}
              <div className="p-4 border-b border-purple-900/30">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-medium">
                    {user?.image ? (
                      <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(user?.name || user?.email || 'U')
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-purple-400/60 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation - Mobile */}
              <nav className="p-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>

              {/* Secondary Navigation - Mobile */}
              <div className="p-4 border-t border-purple-900/30">
                {secondaryNavigation.map((item) => (
                  <NavLink key={item.name} item={item} isSecondary />
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/30 transition-colors min-h-[44px] mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 bg-black border-r border-purple-900/30 flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-purple-900/30">
          <Link href="/dashboard" className="flex items-center gap-3 min-h-[44px]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <Film className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-lg text-white"
                >
                  uWrap
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]',
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-purple-300/60 hover:bg-purple-950/50 hover:text-purple-200'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="py-4 px-3 border-t border-purple-900/30">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]',
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-purple-300/60 hover:bg-purple-950/50 hover:text-purple-200'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {user?.image ? (
                <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(user?.name || user?.email || 'U')
              )}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-purple-400/60 truncate">{user?.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="p-2.5 rounded-xl text-purple-400/60 hover:text-red-400 hover:bg-red-950/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-black border border-purple-900/50 flex items-center justify-center shadow-lg hover:border-purple-500/50 transition-colors min-w-[24px] min-h-[24px]"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-3 h-3 text-purple-400" />
          ) : (
            <ChevronRight className="w-3 h-3 text-purple-400" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ 
          marginLeft: isMobile ? 0 : (sidebarOpen ? 260 : 72) 
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-16 lg:pt-0"
      >
        {/* Top Bar - Desktop */}
        <header className="hidden lg:flex h-16 bg-black/80 backdrop-blur-xl border-b border-purple-900/30 sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/50" />
                <input
                  type="text"
                  placeholder="Cerca..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-900/30 bg-purple-950/30 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder:text-purple-400/40 min-h-[44px]"
                  aria-label="Search"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects/new"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-900/30 bg-purple-950/30 text-purple-200 text-sm hover:bg-purple-900/30 transition-colors min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nuovo Progetto</span>
              </Link>
              
              <button 
                className="p-2.5 rounded-xl text-purple-400/60 hover:bg-purple-950/30 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
