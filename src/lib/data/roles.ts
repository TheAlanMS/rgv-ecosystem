import { z } from "zod/v4";
import { RoleSchema } from "@/lib/types";
import type { Role } from "@/lib/types";

const roles: Role[] = [
  {
    id: "startup",
    label: "Startup / Founder",
    shortLabel: "Founder",
    description: "Building a venture or product in the RGV",
    initials: "F",
    colors: { bg: "rgba(212,168,75,.18)", fg: "#e8c070" },
  },
  {
    id: "student",
    label: "Student / Builder",
    shortLabel: "Student",
    description: "Learning and entering the ecosystem",
    initials: "B",
    colors: { bg: "rgba(74,158,212,.18)", fg: "#6db8e4" },
  },
  {
    id: "investor",
    label: "Investor / Funder",
    shortLabel: "Investor",
    description: "Deploying capital or grants into the region",
    initials: "$",
    colors: { bg: "rgba(61,158,102,.18)", fg: "#52c484" },
  },
  {
    id: "educator",
    label: "Educator / University",
    shortLabel: "Educator",
    description: "Developing talent and knowledge",
    initials: "E",
    colors: { bg: "rgba(74,158,212,.18)", fg: "#6db8e4" },
  },
  {
    id: "edo",
    label: "EDO / Ecosystem Builder",
    shortLabel: "EDO",
    description: "Building the ecosystem itself",
    initials: "ED",
    colors: { bg: "rgba(96,120,104,.25)", fg: "#a8b8a0" },
  },
  {
    id: "corporate",
    label: "Corporate / Buyer",
    shortLabel: "Corporate",
    description: "Seeking innovation partners and local talent",
    initials: "C",
    colors: { bg: "rgba(212,168,75,.18)", fg: "#e8c070" },
  },
  {
    id: "service",
    label: "Service Provider",
    shortLabel: "Service",
    description: "Supporting ventures with professional expertise",
    initials: "SP",
    colors: { bg: "rgba(96,120,104,.25)", fg: "#a8b8a0" },
  },
  {
    id: "policy",
    label: "Policy / Government",
    shortLabel: "Policy",
    description: "Creating enabling conditions for innovation",
    initials: "G",
    colors: { bg: "rgba(96,120,104,.25)", fg: "#a8b8a0" },
  },
];

z.array(RoleSchema).parse(roles);

export const ALL_ROLES: readonly Role[] = roles;
