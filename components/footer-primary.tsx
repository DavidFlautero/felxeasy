'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"
import { CoolMode } from "@/components/magicui/cool-mode";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const AnimatedUnderline = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
  <a 
    href={href} 
    className={`${className} relative overflow-hidden group`}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
  </a>
);

export default function FooterPrimary() {
  const { toast } = useToast()

  return (
    <footer className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Work</h3>
            <ul className="space-y-2">
              <li>
                <AnimatedUnderline href="https://github.com/antoineross/AutoFlex Easy" className="text-primary">
                  AutoFlex Easy
                </AnimatedUnderline>
              </li>
              <li>
                <AnimatedUnderline href="https://github.com/antoineross/Autogen-UI" className="text-primary">
                  Autogen UI
                </AnimatedUnderline>
              </li>
              <li>
                <AnimatedUnderline href="#" className="text-primary">
                  See all →
                </AnimatedUnderline>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <AnimatedUnderline href="#" className="text-primary">
                  About
                </AnimatedUnderline>
              </li>
              <li>
                <AnimatedUnderline href="/documentation" className="text-primary">
                  Documentation
                </AnimatedUnderline>
              </li>
           
              <li>
                <AnimatedUnderline href="mailto:hello@antoineross.com" className="text-primary">
                  Contact us
                </AnimatedUnderline>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <AnimatedUnderline href="https://x.com/AutoFlex" className="text-primary">
                  X
                </AnimatedUnderline>
              </li>
              <li>
                <AnimatedUnderline href="https://linkedin.com/in/AutoFlex" className="text-primary">
                  LinkedIn
                </AnimatedUnderline>
              </li>
              <li>
                <AnimatedUnderline href="https://github.com/AutoFlex" className="text-primary">
                  GitHub
                </AnimatedUnderline>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 flex flex-col items-center md:flex-row justify-between">
          <div className="flex items-center space-x-2">
            <LogInIcon className="h-6 w-6" />
            <span className="text-xl font-bold">AutoFlex Easy.</span>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0">© AutoFlex Easy Inc. 2025</p>
        </div>
      </div>
    </footer>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}