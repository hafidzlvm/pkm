'use client';

import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ArrowRightLink({
  urlLink,
}: {
  urlLink: string;
}) {
  return (
    <ArrowRight className="cursor-pointer" onClick={() => window.open(urlLink, '_blank')} />
  );
}

export function ArrowUpRightLink({
  urlLink,
}: {
  urlLink: string;
}) {
  return (
    <ArrowUpRight className="cursor-pointer" onClick={() => window.open(urlLink, '_blank')} />
  );
}