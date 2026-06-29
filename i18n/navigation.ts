import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation APIs. Use these <Link>/redirect/usePathname/useRouter
// everywhere instead of next/link so the active locale prefix is applied
// automatically (and omitted for the default locale).
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
